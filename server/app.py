#!/usr/bin/env python3

# Standard library imports
from email.mime import base
from datetime import datetime, timedelta
from hmac import new
from nis import maps
from io import BytesIO
import zipfile
import os
import json
import requests

# Remote library imports
from flask import send_from_directory
from flask import make_response, request, session, jsonify 
from flask_restful import Resource
import replicate
from flask import current_app


# Local imports
from models import db, Material
from config import app, api

## api prefix for endpoints
#URL_PREFIX = '/api'

##replicate API vars
replicate.api_token = os.getenv("REPLICATE_API_TOKEN")
#model_name = "stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478"


##------HELPER FUNCTIONS FOR GENERATING TEXTURES------##
##----------------------------------------------------##
## TURNS MATERIAL DATA INTO PROMPT FOR GENERATING TEXTURE:
def construct_prompt_from_material_data(material_data):
    try:
      # Extract physical properties of materials from materialData json
      color = material_data.get('color', 'default color').lower()
      elementType = material_data.get('elementType', 'default elementType').lower()
      #material_type = material_data.get('materialType', {}).get('label', 'PBR material').lower()
      condition = material_data.get('condition', 'default condition').lower()
      manifestation = material_data.get('manifestation', 'default manifestation').lower()
      #software = [{'Program': item.get('label', 'default software').lower()} for item in material_data.get('materialMetadata', [])]
      #maps = [{'Map': item.get('label', 'default map').lower()} for item in material_data.get('materialTextures', [])]
    
      # Construct prompt
      prompt = f"{condition} {color} {elementType} {manifestation} seamless texture, trending on artstation, base color, albedo, 4k"
      print("Logging prompt:", prompt)  
      return prompt
    
    except Exception as e:
      print(f"error: {e}")
      raise Exception(f"Failed to generate prompt!: {e}")

####### API CALLS TO GENERATE TEXTURES INDIVIDUALLY #######
##--------------------------------------------------------##

def generate_specific_pbr_map(map_type):
    pbr_maps = {}
    try:
        data = request.get_json()
        base_color_url = data.get('base_color_url')
        if not base_color_url:
            return jsonify({"error": "Albedo URL is required"}), 400

        print(f"Generating {map_type} map...")
        map_output = generate_pbr_from_albedo(base_color_url, map_type)
        pbr_maps.update(map_output)

        material_id = data.get('material_id')
        if not material_id:
            return jsonify({"error": "material_id is required"}), 400

        material = Material.query.get(material_id)
        if material:
            setattr(material, f"{map_type}_url", pbr_maps.get(map_type))
            db.session.commit()
            return jsonify({"message": f"{map_type} map generated successfully", "pbr_map": pbr_maps[map_type]}), 200
        else:
            return jsonify({"error": "Material not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

## MAKES API CALL TO REPLICATE TO GENERATE TEXTURE USING PROMPT, RETURNS URL AS OUTPUT###
def generate_image_from_prompt(prompt):
    try:
        # Specify the model name and parameters for replicate.run()
        # replicate.api_token = os.getenv("REPLICATE_API_TOKEN")
        os.environ["REPLICATE_API_TOKEN"] = "r8_UG5Hm4swKAvk3K39YmcsMFqwuHlUELh3AAXCJ"
        model1= "tommoore515/material_stable_diffusion:3b5c0242f8925a4ab6c79b4c51e9b4ce6374e9b07b5e8461d89e692fd0faa449"
        params1 = {
            "width": 512, 
            "height": 512,
            "prompt": prompt,
            "num_outputs": 1,
            "guidance_scale": 7.5,
            "prompt_strength": 0.8,
            "num_inference_steps": 50
        }
        
        model2 = "tstramer/material-diffusion:a42692c54c0f407f803a0a8a9066160976baedb77c91171a01730f9b0d7beeff"
        params2 = {
            "width": 512,
            "height": 512,
            "prompt": prompt,
            "scheduler": "K-LMS",
            "num_outputs": 1,
            "guidance_scale": 7.5,
            "prompt_strength": 0.8,
            "num_inference_steps": 50
            }

        # Run the API call
        output = replicate.run(model2, input=params2)
        print("Logging output from Replicate:", output)

        # Check if the output is a list with a valid URL
        if output and isinstance(output[0], str):
            print("Image URL:", output[0])
            return output[0]
        else:
            raise Exception("Invalid output format")

    except Exception as e:
        print(f"An error occurred: {e}")
        raise Exception(f"Failed to generate image: {e}")
      
## MAKES API CALL TO GENERATE PBR MAPS FROM ALBEDO MAP & RETURNS URLS ###
def generate_pbr_from_albedo(base_color_url, map_type):
    generated_maps = {}
    #replicate.api_token = os.getenv("REPLICATE_API_TOKEN")
    os.environ["REPLICATE_API_TOKEN"] = "r8_UG5Hm4swKAvk3K39YmcsMFqwuHlUELh3AAXCJ"

    ## FOR SINGLE MAP (THIS WORKS!)
    print(f"loaded albedo, attempting to generate: {map_type}" )
    try:
        output = replicate.run(
            "tommoore515/pix2pix_tf_albedo2pbrmaps:21bd96b6e69f40e54502d67798f9025ab9e4a9e08f2a1b51dde5131b129a825e",
            input={
                "model": map_type,
                "imagepath": base_color_url
            }
        )

        # Check if the output is a valid URL string
        if output and isinstance(output, str):
            generated_maps[map_type] = output
            print(f"{map_type} Map generated: {output}")
        else:
            raise Exception(f"Invalid output format for {map_type}")

    except Exception as e:
        print(f"Error generating {map_type} map: {e}")
        generated_maps[map_type] = None  # Assign None if generation fails

    return generated_maps


## CLIENT --> SERVER ENDPOINTS: GENERATE TEXTURES FOR WEBPAGE:
##----------------------------------------##
## GET MATERIAL DATA FROM FORMDATA, EXTRACT PROMPT, GENERATE TEXTURE, RETURN URL/id:
@app.post("/api/generate_albedo")
def generate_albedo():
    try:
        material_data = request.get_json().get('materialData', {})
        prompt = construct_prompt_from_material_data(material_data)
        image_url = generate_image_from_prompt(prompt)

        new_material = Material(
            workflow=material_data.get('materialType', {}).get('label', ''),
            maps=json.dumps(material_data.get('materialTextures', [])),
            software=json.dumps(material_data.get('materialMetadata', [])),
            color=material_data.get('color', ''),
            element=material_data.get('elementType', ''),
            condition=material_data.get('condition', ''),
            manifestation=material_data.get('manifestation', ''),
            prompt=prompt,
            base_color_url=image_url
        )
        db.session.add(new_material)
        db.session.commit()

        return jsonify({'image_url': image_url, 'material_id': new_material.id}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


## GENERATE ADDITIONAL PBR MAPS FROM ALBEDO MAP: ##
@app.post("/api/generate_pbr_maps")
def generate_pbr_maps():
    map_types = ["albedo2normal", "albedo2height", "albedo2smoothness"]
    pbr_maps = {}
    try:
        data = request.get_json()
        base_color_url = data.get('base_color_url')
        if not base_color_url:
            return jsonify({"error": "Albedo URL is required"}), 400

        print("Preparing to generate pbrs from albedo...")
        for map_type in map_types:
            print(f"Generating {map_type} map...")
            map_output = generate_pbr_from_albedo(base_color_url, map_type)
            pbr_maps.update(map_output)  # Update the dictionary instead of overwriting

        material_id = data.get('material_id')
        if not material_id:
            return jsonify({"error": "material_id is required"}), 400

        material = Material.query.get(material_id)
        if material:
            material.normal_map_url = pbr_maps.get("albedo2normal")
            material.height_map_url = pbr_maps.get("albedo2height")
            material.smoothness_map_url = pbr_maps.get("albedo2smoothness")
            db.session.commit()
            return jsonify({"message": "PBR maps generated successfully", "pbr_maps": pbr_maps}), 200
        else:
            return jsonify({"error": "Material not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500




######## Server-->Client ENDPOINTS ######
##-------------------------------------##
## GET Generated Images from DB ####
@app.get("/api/get_albedo_maps")
def get_albedo_maps():
    try:
        materials = Material.query.all()
        images_urls = [material.base_color_url for material in materials]
        return jsonify({'image_urls': images_urls}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


@app.get("/api/get_maps/<int:id>")
def get_maps_by_id(id):
    try:
        material = db.session.get(Material, id)
        images_urls = [material.base_color_url, material.normal_map_url, material.height_map_url, material.smoothness_map_url]
        return jsonify({'image_urls': images_urls}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.get("/api/get_albedo_by_id/<int:material_id>")
def get_albedo_by_id(material_id):
    try:
        material = Material.query.get(material_id)
        if material:
            return jsonify({'image_url': material.base_color_url, 'material_id': material.id}), 200
        else:
            return jsonify({"error": "Material not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.get("/api/get_normal_by_id/<int:material_id>")
def get_normal_by_id(material_id):
    try:
        material = Material.query.get(material_id)
        if material:
            return jsonify({'image_url': material.normal_map_url, 'material_id': material.id}), 200
        else:
            return jsonify({"error": "Material not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.get("/api/get_height_by_id/<int:material_id>")
def get_height_by_id(material_id):
    try:
        material = Material.query.get(material_id)
        if material:
            return jsonify({'image_url': material.height_map_url, 'material_id': material.id}), 200
        else:
            return jsonify({"error": "Material not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/api/get_smoothness_by_id/<int:material_id>")
def get_smoothness_by_id(material_id):
    try:
        material = Material.query.get(material_id)
        if material:
            return jsonify({'image_url': material.smoothness_map_url, 'material_id': material.id}), 200
        else:
            return jsonify({"error": "Material not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500





#### GET RECENTLY GENERATED MAPS w order_by ####
@app.get("/api/get_recent_pbrs")
def get_recent_pbrs():
    try:
        material = Material.query.order_by(Material.id.desc()).first()
        image_url = [material.normal_map_url, material.height_map_url, material.smoothness_map_url]
        return jsonify({'image_url': image_url, 'material_id': material.id}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.get("/api/get_recent_albedo")
def get_recent_albedo():
    try:
        material = Material.query.order_by(Material.id.desc()).first()
                    
        image_url = material.base_color_url
        return jsonify({'image_url': image_url, 'material_id': material.id}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.get("/api/get_recent_normal")
def get_recent_normal():
    try:
        material = Material.query.order_by(Material.id.desc()).first()
        image_url = material.normal_map_url
        return jsonify({'image_url': image_url, 'material_id': material.id}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/api/get_recent_height")
def get_recent_height():
    try:
        material = Material.query.order_by(Material.id.desc()).first()
        image_url = material.height_map_url
        return jsonify({'image_url': image_url, 'material_id': material.id}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.get("/api/get_recent_smoothness")
def get_recent_smoothness():
    try:
        material = Material.query.order_by(Material.id.desc()).first()
        image_url = material.smoothness_map_url
        return jsonify({'image_url': image_url, 'material_id': material.id}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


## Get 10 most recent materials:
@app.get("/api/get_10_recent_materials")
def get_recent_materials():
    try:
        materials = Material.query.order_by(Material.id.desc()).limit(10).all()
        return jsonify({'materials': [material.to_dict() for material in materials]}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500




##-------------------------------------##
## Download Functionality ##
# USING URLS 
# def download_image(url):
#     try:
#         response = requests.get(url)
#         if response.status_code == 200:
#             return BytesIO(response.content)
#         else:
#             raise Exception(f"Failed to download image from {url}")
#     except Exception as e:
#         raise Exception(f"Error downloading image: {e}")

# def create_summary_text(material):
#     # Add more details as required
#     return f"Material ID: {material.id}\nBase Color URL: {material.base_color_url}\n..."

# def create_downloadable_zip(material_id):
#     material = Material.query.get(material_id)
#     if not material:
#         raise FileNotFoundError("Material not found")

#     zip_filename = f"material_{material_id}.zip"
#     temp_images_dir = os.path.join(current_app.root_path, 'temp_images')
#     os.makedirs(temp_images_dir, exist_ok=True)
#     full_zip_path = os.path.join(temp_images_dir, zip_filename)

#     with zipfile.ZipFile(full_zip_path, 'w') as zipf:
#         for map_type, attribute_name in [('base_color', 'base_color_url'), ('normal', 'normal_map_url'), ('height', 'height_map_url'), ('smoothness', 'smoothness_map_url')]:
#             image_url = getattr(material, attribute_name, None)
#             if image_url:
#                 image_data = download_image(image_url)
#                 image_name = os.path.basename(image_url)
#                 zipf.writestr(image_name, image_data.getvalue())

#         summary_text = create_summary_text(material)
#         summary_filename = "summary.txt"
#         zipf.writestr(summary_filename, summary_text)

#     return full_zip_path


##local paths:
# def download_image(url):
#     try:
#         response = requests.get(url)  # Using 'requests.get' instead of 'request.get'
#         if response.status_code == 200:
#             filename = os.path.join('temp_images', url.split('/')[-1])
#             os.makedirs(os.path.dirname(filename), exist_ok=True)
#             with open(filename, 'wb') as f:
#                 f.write(response.content)
#             return filename
#         else:
#             raise Exception(f"Failed to download image from {url}")
#     except Exception as e:
#         raise Exception(f"Error downloading image: {e}")

def download_image(url, filename):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            os.makedirs(os.path.dirname(filename), exist_ok=True)
            with open(filename, 'wb') as f:
                f.write(response.content)
        else:
            raise Exception(f"Failed to download image from {url}")
    except Exception as e:
        raise Exception(f"Error downloading image: {e}")

def create_summary_text(material):
    # Constructing summary text with material details
    summary_lines = [
        f"Material ID: {material.id}",
        f"Workflow: {material.workflow}",
        f"Color: {material.color}",
        f"Element: {material.element}",
        f"Condition: {material.condition}",
        f"Manifestation: {material.manifestation}",
        f"Prompt: {material.prompt}",
        f"Base Color URL: {material.base_color_url}",
        f"Normal Map URL: {material.normal_map_url}",
        f"Height Map URL: {material.height_map_url}",
        f"Smoothness Map URL: {material.smoothness_map_url}",
        f"Maps: {material.maps}",
        f"Software: {material.software}"
    ]

    return "\n".join(summary_lines)


# def create_downloadable_zip(material_id):
#     material = Material.query.get(material_id)
#     if not material:
#         raise FileNotFoundError("Material not found")

#     zip_filename = f"material_{material_id}.zip"
#     with zipfile.ZipFile(zip_filename, 'w') as zipf:
#         # Replace 'attribute_name' with the correct attribute names from your Material model
#         for map_type, attribute_name in [('base_color', 'base_color_url'), ('normal', 'normal_map_url'), ('height', 'height_map_url'), ('smoothness', 'smoothness_map_url')]:
#             image_url = getattr(material, attribute_name, None)
#             if image_url:
#                 image_path = download_image(image_url)
#                 zipf.write(image_path, os.path.basename(image_path))
#                 os.remove(image_path)  # Clean up the downloaded image


#         summary_text = create_summary_text(material)
#         summary_filename = "summary.txt"
#         with open(summary_filename, "w") as summary_file:
#             summary_file.write(summary_text)
#         zipf.write(summary_filename, summary_filename)
#         os.remove(summary_filename)  # Clean up the summary file

#     return zip_filename

def create_downloadable_zip(material_id):
    material = Material.query.get(material_id)
    if not material:
        raise FileNotFoundError("Material not found")

    # Construct folder name based on material attributes
    folder_name = f"{material.color}_{material.element}_{material.manifestation}_{material.condition}"
    temp_images_dir = os.path.join(current_app.root_path, 'temp_images', folder_name)
    os.makedirs(temp_images_dir, exist_ok=True)

    zip_filename = os.path.join(temp_images_dir, f"{folder_name}.zip")
    
    with zipfile.ZipFile(zip_filename, 'w') as zipf:
        for map_type, attribute_name in [('base_color', 'base_color_url'), ('normal', 'normal_map_url'), 
                                         ('height', 'height_map_url'), ('smoothness', 'smoothness_map_url')]:
            image_url = getattr(material, attribute_name, None)
            if image_url:
                filename = f"{folder_name}_{map_type}.png"
                filepath = os.path.join(temp_images_dir, filename)
                download_image(image_url, filepath)
                zipf.write(filepath, filename)

    return zip_filename



@app.route("/api/download_material/<int:material_id>", methods=['GET'])
def download_material(material_id):
    try:
        zip_filename = create_downloadable_zip(material_id)
        directory = os.path.dirname(zip_filename)
        response = send_from_directory(directory, os.path.basename(zip_filename), as_attachment=True)
        cleanup_temporary_directory(directory)  # Clean up after sending the file
        return response
        # return send_from_directory(directory, os.path.basename(zip_filename), as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 500





##-------------------------------------##
##CLEANUP FUNCTIONALITY:
import shutil

def cleanup_temporary_directory(directory):
    try:
        shutil.rmtree(directory)
        print(f"Cleaned up temporary directory: {directory}")
    except Exception as e:
        print(f"Error during cleanup: {e}")



#### flush db data /60min functionality ####


##-------------------------------------##
## flush db entries older than 60 minutes ####
# def flush_old_materials():
#     # Define the time threshold (e.g., 60 minutes old)
#     time_threshold = datetime.utcnow() - timedelta(minutes=60)

#     # Query for old materials
#     old_materials = Material.query.filter(Material.created_at < time_threshold).all()

#     # Delete old materials
#     for material in old_materials:
#         db.session.delete(material)

#     db.session.commit()

    

##-------------------------------------##
## error handlers: catch errors thrown from @validates and other exceptions
@app.errorhandler(Exception)
def handle_errors(e):
    return {'error': f'Exception:{str(e)}'}, 404

@app.errorhandler(ValueError)
def handle_errors(e):
    return {"error": f"Value Error:{str(e)}"}, 422
    
if __name__ == '__main__':
    app.run(port=3001, debug=True)
    
    
