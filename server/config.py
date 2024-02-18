# Standard library imports
import re, os, pathlib
# Remote library imports
from flask import Flask, render_template, make_response, jsonify, request, send_from_directory, url_for
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from dotenv import load_dotenv

from models import db, Material
load_dotenv()
# Instantiate app, set attributes

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/dist',
    template_folder='../client/dist'
)


print(os.environ.get('DATABASE_URI')) 
print(os.environ.get('PORT')) 

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'])
# def catch_all(path):
#     return render_template("index.html")



# app.secret_key = os.environ.get("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URI")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

# Instantiate REST API
# api = Api(app)

# CORS settings
# CORS(app, resources={r"/api/*": {"origins": "*" }}
#      )
# cors_config = {
#     "origins": "*",
#     "supports_credentials": True,
#     "allow_headers": ["Content-Type", "Authorization", "X-Requested-With", "X-CSRFToken", "Cache-Control"],
#     "expose_headers": ["Content-Disposition", "X-Suggested-Filename"],
#     "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
# }
# CORS(app, resources={
#                      r"/api/*": cors_config,
#                      r"/assets/*": cors_config,
#                      })



## test endpoint for flask endpoints 
@app.get("/api/test",  methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
def test():
    return make_response({"message": "Test endpoint is working"}), 200
    # try:
    #     app.logger.info("Test endpoint is working")
    #     return make_response({"message": "Test endpoint is working"}), 200
    # except Exception as e:
    #     app.logger.error('Error in test: %s', str(e))
    #     return make_response({"error": str(e)}), 500


#!/usr/bin/env python3

# # Standard library imports
# from email.mime import base, image
# from datetime import datetime, timedelta
# from hmac import new
# from nis import maps
# from io import BytesIO
# from pyexpat import model
# import zipfile
# import os
# import json
# import requests
# import shutil
# import webbrowser
# import logging
# from logging.handlers import RotatingFileHandler

# # Remote library imports
# from flask import make_response, request, session, jsonify, url_for, render_template,  send_from_directory, current_app, after_this_request
# from flask_restful import Resource
# from flask_cors import cross_origin
# import replicate
# from dotenv import load_dotenv


# # Local imports
# from models import db, Material




# # Load environment variables

# api_token = os.getenv("REPLICATE_API_TOKEN")
# os.environ["REPLICATE_API_TOKEN"] = api_token

# # Setup Logging
# def setup_logging():
#     if app.config['LOG_WITH_GUNICORN']:
#         gunicorn_error_logger = logging.getLogger('gunicorn.error')
#         app.logger.handlers.extend(gunicorn_error_logger.handlers)
#         app.logger.setLevel(logging.DEBUG)
#     else:
#         if not os.path.exists('logs'):
#             os.makedirs('logs')
#         file_handler = RotatingFileHandler('logs/app.log', maxBytes=10240, backupCount=10)
#         file_handler.setFormatter(logging.Formatter(
#             '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
#         file_handler.setLevel(logging.INFO)
#         app.logger.addHandler(file_handler)
#         app.logger.setLevel(logging.INFO)
#         app.logger.info('Application startup')
    
# setup_logging()




# ##-------HELPER FUNCTIONS: GENERAL-------##
# ##-------------------------------##

# ##gets image urls for endpoints; limits redundancies
# def get_material_urls(material_id):
#     material = Material.query.get(material_id)
#     if material:
#         return {
#             'base_color_url': material.base_color_url,
#             'normal_map_url': material.normal_map_url,
#             'height_map_url': material.height_map_url,
#             'smoothness_map_url': material.smoothness_map_url
#         }
#     else:
#         return None



# ##------FUNCTIONS for API Calls/Generating Textures/Handling Prompts and MaterialData------##
# ##----------------------------------------------------##

# ## TURNS MATERIAL DATA INTO PROMPT FOR GENERATING TEXTURE:
# def construct_prompt_from_material_data(material_data):
#     try:
#       # Extract physical properties of materials from materialData json
#       color = material_data.get('color', 'default color').lower()
#       elementType = material_data.get('elementType', 'default elementType').lower()
#       #material_type = material_data.get('materialType', {}).get('label', 'PBR material').lower()
#       condition = material_data.get('condition', 'default condition').lower()
#       manifestation = material_data.get('manifestation', 'default manifestation').lower()
#       #software = [{'Program': item.get('label', 'default software').lower()} for item in material_data.get('materialMetadata', [])]
#       #maps = [{'Map': item.get('label', 'default map').lower()} for item in material_data.get('materialTextures', [])]
    
#       # Construct prompt
#       prompt = f"{condition} {color} {elementType} {manifestation} seamless texture, trending on artstation, base color, albedo, 4k"
#       app.logger.info("Generated prompt: %s", prompt)
#       return prompt
    
#     except Exception as e:
#         app.logger.error('Error in construct_prompt_from_material_data: %s', str(e))
#         raise




# ##------API CALLS------##
# ##----------------------------------------##

# ##FIRST API CALL FOR ALBEDO MAP:
# def generate_image_from_prompt(model_identifier, prompt, params):
#     try:
#         ##PUBLIC MODEL SETUP:
#         output = replicate.run(model_identifier, input=params)
#         app.logger.info("Output from Replicate: %s", output)

#         # Check if the output is a list with a valid URL
#         if output and isinstance(output[0], str):
#             return output[0]
#         else:
#             raise Exception("Invalid output format")
        
        
#         ##CUSTOM DEPLOYED MODEL SETUP:
#         # deployment = replicate.deployments.get(model_identifier)
#         # prediction = deployment.predictions.create(input=params)
#         # prediction.wait()

#         # if prediction.status == 'succeeded':
#         #     return prediction.output
#         # else:
#         #     raise Exception(f"Failed to generate image: {prediction.status}")


#     # except Exception as e:
#     #     print(f"An error occurred: {e}")
#     #     raise Exception(f"Failed to generate image: {e}")
#     except Exception as e:
#         app.logger.error('Error in generate_image_from_prompt: %s', str(e))
#         raise
  
# ##SECOND API CALL FOR ALBEDO TO PBR MAPS:  
# def generate_pbr_from_albedo(base_color_url, map_type):
#     try:
#         ##PUBLIC MODEL SETUP:
#         params = {"model": map_type, "imagepath": base_color_url}
#         model_identifier = "tommoore515/pix2pix_tf_albedo2pbrmaps:21bd96b6e69f40e54502d67798f9025ab9e4a9e08f2a1b51dde5131b129a825e"
#         app.logger.info(f"Attempting to generate {map_type} map from {base_color_url}")
#         output = replicate.run(model_identifier, input=params)

#         if output and isinstance(output, str):
#             app.logger.info(f"{map_type} Map generated: {output}")
#             return output
#         else:
#             raise Exception(f"Invalid output format for {map_type}")
        
#         #CUSTOM MODEL SETUP:
#         # model_identifier = "thegrayeminence/albedo-to-pbr-generator"
#         # params = {"model": map_type, "imagepath": base_color_url}
#         # deployment = replicate.deployments.get(model_identifier)
#         # prediction = deployment.predictions.create(input=params)
#         # prediction.wait()
        
#         # if prediction.status == 'succeeded':
#         #     return prediction.output
#         # else:
#         #     raise Exception(f"Failed to generate PBR map: {prediction.status}")
        
        
#     except Exception as e:
#         app.logger.error('Error in generate_pbr_from_albedo: %s', str(e))
#         raise
          
          
          
          
# # def generate_specific_pbr_map(map_type):
# #     try:
# #         data = request.get_json()
# #         base_color_url = data.get('base_color_url')
# #         if not base_color_url:
# #             return jsonify({"error": "Base color URL is required"}), 400

# #         model_identifier = "thegrayeminence/albedo-to-pbr-generator"
# #         pbr_map_url = generate_pbr_from_albedo(model_identifier, base_color_url, map_type)

# #         return jsonify({'pbr_map_url': pbr_map_url}), 200

# #     except Exception as e:
# #         app.logger.error('Error in generate_specific_pbr_map: %s', str(e))
# #         return jsonify({"error": str(e)}), 500



# # @app.route('/', defaults={'path': ''})
# # @app.route('/<path:path>')
# # def catch_all(path):
# #     return render_template("index.html")

# # @app.after_request
# # def after_request(response):
# #     # response.headers["Access-Control-Allow-Origin"] = "*"
# #     # response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
# #     # response.headers["Access-Control-Allow-Headers"] = "Content-Type, X-Requested-With"
# #     response.headers.add('Access-Control-Allow-Origin', '*')
# #     response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
# #     response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
    
# #     return response

# ## CLIENT --> SERVER ENDPOINTS ####:
# ##----------------------------------------##


    

# ## first endpoint for generating albedo
# @app.post("/api/generate_albedo")
# def generate_albedo():
    
#     ##model_identifier options (custom vs public mat diffusion models)
#     custom_model = "thegrayeminence/albedo-generator"
#     mat_diffusion = "tstramer/material-diffusion:a42692c54c0f407f803a0a8a9066160976baedb77c91171a01730f9b0d7beeff"
#     mat_diffusion_tom = "tommoore515/material_stable_diffusion:3b5c0242f8925a4ab6c79b4c51e9b4ce6374e9b07b5e8461d89e692fd0faa449"
    
#     ##mat diffusion model to use; CHANGE THIS VAR to switch between models for text-->image generation
#     model_identifier = mat_diffusion
    
#     try:
#         ##values/parameters for generate_image_from_prompt() argument
#         material_data = request.get_json().get('materialData', {})
#         prompt = construct_prompt_from_material_data(material_data)
#         params = {
#             "width": 512, 
#             "height": 512, 
#             "prompt": prompt, 
#             "scheduler": "K-LMS", 
#             "num_outputs": 1, 
#             "guidance_scale": 7.5, 
#             "prompt_strength": 0.8, 
#             "num_inference_steps": 50
#         }

        
#         ##generating image_uri from matdata/prompt/params/etc values
#         image_url = generate_image_from_prompt(model_identifier, prompt, params)
#         app.logger.info(image_url)
        
#         ##instantiating new material to store in db
#         new_material = Material(
#             workflow=material_data.get('materialType', {}).get('label', ''),
#             maps=json.dumps(material_data.get('materialTextures', [])),
#             software=json.dumps(material_data.get('materialMetadata', [])),
#             color=material_data.get('color', ''),
#             element=material_data.get('elementType', ''),
#             condition=material_data.get('condition', ''),
#             manifestation=material_data.get('manifestation', ''),
#             prompt=prompt,
#             base_color_url=image_url
#         )
#         db.session.add(new_material)
#         db.session.commit()
#         app.logger.info("Albedo map generated successfully.")
#         response = jsonify({'image_url': image_url, 'material_id': new_material.id})
#         # response.headers.add('Access-Control-Allow-Origin', '*')
#         return make_response(response, 200)
    
#     except Exception as e:
#         db.session.rollback()
#         app.logger.error('Error in generate_albedo: %s', str(e))
#         return jsonify({"error": str(e)}), 500


# #second endpoint for generating pbr maps from albedo
# @app.route("/api/generate_pbr_maps", methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
# def generate_pbr_maps():
#     try:
#         data = request.get_json()
#         material_id = data.get('material_id')
#         base_color_url = data.get('base_color_url')
#         map_types = ["albedo2normal", "albedo2height", "albedo2smoothness"]
#         pbr_maps = {}
        
#         print("Preparing to generate pbrs from albedo...")
#         for map_type in map_types:
#             print(f"Generating {map_type} map...")
#             pbr_map_url = generate_pbr_from_albedo( base_color_url, map_type)
#             pbr_maps[map_type] = pbr_map_url

#         material = Material.query.get(material_id)
#         if material:
#             material.normal_map_url = pbr_maps.get("albedo2normal")
#             material.height_map_url = pbr_maps.get("albedo2height")
#             material.smoothness_map_url = pbr_maps.get("albedo2smoothness")
#             db.session.commit()
#             app.logger.info("PBR maps generated successfully.")
#             return jsonify({'pbr_maps': pbr_maps}), 200
#         else:
#             return jsonify({"error": "Material not found"}), 404
    
#     except Exception as e:
#             db.session.rollback()
#             app.logger.error('Error in generate_pbr_maps: %s', str(e))
#             return jsonify({"error": str(e)}), 500





# ######## Server-->Client ENDPOINTS ######
# ##-------------------------------------##
# ## GET Generated Images from DB ####
# @app.route("/api/get_albedo_maps",  methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
# def get_albedo_maps():
#     try:
#         materials = Material.query.all()
#         images_urls = [material.base_color_url for material in materials]
#         return jsonify({'image_urls': images_urls}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    



# @app.route("/api/get_maps/<int:material_id>",  methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
# def get_maps_by_id(material_id):
#     material_urls = get_material_urls(material_id)
#     if material_urls:
#         return jsonify({'image_urls': material_urls}), 200
#     else:
#         return jsonify({"error": "Material not found"}), 404


# @app.route("/api/get_albedo_by_id/<int:material_id>",  methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
# def get_albedo_by_id(material_id):
#     material_urls = get_material_urls(material_id)
#     if material_urls:
#         return jsonify({'image_url': material_urls['base_color_url'], 'material_id': material_id}), 200
#     else:
#         return jsonify({"error": "Material not found"}), 404
    

# @app.route("/api/get_recent_pbrs",  methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
# def get_recent_pbrs():
#     try:
#         material = Material.query.order_by(Material.id.desc()).first()
#         if material:
#             material_urls = get_material_urls(material.id)
#             image_urls = [material_urls['normal_map_url'], material_urls['height_map_url'], material_urls['smoothness_map_url']]
#             return jsonify({'image_url': image_urls, 'material_id': material.id}), 200
#         else:
#             return jsonify({"error": "No recent PBRs found"}), 404
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    
    
# @app.route("/api/get_recent_albedo",  methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
# def get_recent_albedo():
#     try:
#         material = Material.query.order_by(Material.id.desc()).first()
#         if material:
#             material_urls = get_material_urls(material.id)
#             return jsonify({'image_url': material_urls['base_color_url'], 'material_id': material.id}), 200
#         else:
#             return jsonify({"error": "No recent albedo found"}), 404
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    

# ##-------------------------------------##
# ## Image Serving/Download Functionality ##

# @app.route('/api/get_static_images',  methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
# def get_all_images():
#     images_dir_path = os.path.join(app.static_folder, 'assets', 'images')

#     folders = [name for name in os.listdir(images_dir_path) if os.path.isdir(os.path.join(images_dir_path, name))]
    
#     all_folders_images = []
    
#     try:
#         for folder_name in folders:
#             map_types = ['base_color.png', 'height.png', 'normal.png', 'smoothness.png']
#             images = [f"{base_url}/{folder_name}/{folder_name}_{map_type}" for map_type in map_types]
#             folder_images = {
#                 "folder": folder_name,
#                 "images": images
#             }
#             all_folders_images.append(folder_images)
        
#         return make_response(jsonify(all_folders_images), 200)
    
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
            
        

# @app.route('/api/images/<folder_name>', methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
# def get_images(folder_name):
#     folder_path = os.path.join(app.static_folder, 'assets', 'images', folder_name)
#     # dynamic_base_path = os.getenv('IMAGE_BASE_URL', 'http://localhost:3000/assets/images') 

#     if not os.path.exists(folder_path) or not os.path.isdir(folder_path):
#         return jsonify({"error": f"Folder not found; folder info \n path_static:{folder_path} \n "}), 404

#     try:
#         image_files = [f for f in os.listdir(folder_path) if f.endswith('.png')]
#         image_urls = [url_for('static', filename=f'assets/images/{folder_name}/{file}', _external=True) for file in image_files]
       
#         # map_types = ['base_color.png', 'height.png', 'normal.png', 'smoothness.png']
#         # images = [f"{dynamic_base_path}/{folder_name}/{folder_name}_{map_type}" for map_type in map_types]
        
#         return make_response({"folder": folder_name, "images": image_urls}, 200)
    
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500



# def download_image(url, filename):
#     try:
#         response = requests.get(url)
#         if response.status_code == 200:
#             os.makedirs(os.path.dirname(filename), exist_ok=True)
#             with open(filename, 'wb') as f:
#                 f.write(response.content)
#         else:
#             raise Exception(f"Failed to download image from {url}")
#     except Exception as e:
#         raise Exception(f"Error downloading image: {e}")

# def create_summary_text(material):
#     # summary text file with material details
#     summary_lines = [
#         f"Material ID: {material.id}",
#         f"Workflow: {material.workflow}",
#         f"Color: {material.color}",
#         f"Element: {material.element}",
#         f"Condition: {material.condition}",
#         f"Manifestation: {material.manifestation}",
#         f"Prompt: {material.prompt}",
#         f"Base Color URL: {material.base_color_url}",
#         f"Normal Map URL: {material.normal_map_url}",
#         f"Height Map URL: {material.height_map_url}",
#         f"Smoothness Map URL: {material.smoothness_map_url}",
#         f"Maps: {material.maps}",
#         f"Software: {material.software}"
#     ]

#     return "\n".join(summary_lines)


# def create_downloadable_zip(material_id):
    
#     material = Material.query.get(material_id)
#     if not material:
#         raise FileNotFoundError("Material not found")

#     # Construct folder name based on material attributes
#     folder_name = f"{material.color}_{material.element}_{material.manifestation}_{material.condition}"
#     temp_images_dir = os.path.join(current_app.root_path, 'temp_images', folder_name)
#     os.makedirs(temp_images_dir, exist_ok=True)
    
#     app.logger.info(f"folder_name: {folder_name}")
    
#     zip_filename = os.path.join(temp_images_dir, f"{folder_name}.zip")
#     app.logger.info(f"Creating zip file at: {zip_filename}")

#     with zipfile.ZipFile(zip_filename, 'w') as zipf:
#         for map_type, attribute_name in [('base_color', 'base_color_url'), ('normal', 'normal_map_url'), 
#                                          ('height', 'height_map_url'), ('smoothness', 'smoothness_map_url')]:
#             image_url = getattr(material, attribute_name, None)
#             if image_url:
#                 filename = f"{folder_name}_{map_type}.png"
#                 filepath = os.path.join(temp_images_dir, filename)
#                 download_image(image_url, filepath)
#                 zipf.write(filepath, filename)

#     return zip_filename


# ##gets proper filename for zip file/unzipped folder
# @app.route("/api/get_material_filename/<int:material_id>",  methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
# def get_material_filename(material_id):
#     try:
#         material = Material.query.get(material_id)
#         if not material:
#             return jsonify({"error": "Material not found"}), 404

#         filename = f"{material.color}_{material.element}_{material.manifestation}_{material.condition}.zip"
#         return jsonify({"filename": filename})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    

# @app.route("/api/download_material/<int:material_id>",  methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
# def download_material(material_id):
#     try:
#         zip_file_path = create_downloadable_zip(material_id)
#         directory = os.path.dirname(zip_file_path)
#         filename = os.path.basename(zip_file_path)
        
#         response = send_from_directory(directory, filename, as_attachment=True)
#         app.logger.info(f"Serving zip from: {zip_file_path} to: {directory} with filename: {filename}")
        
#         # Clean up after sending the file
#         cleanup_temporary_directory(directory) 
#         return response
#     except Exception as e:
#         app.logger.error(f"Error in download_material: {e}")
#         return jsonify({"error": str(e)}), 500



# ##-------------------------------------##
# ##CLEANUP FUNCTIONALITY:

# def cleanup_temporary_directory(directory):
#     try:
#         shutil.rmtree(directory)
#         print(f"Cleaned up temporary directory: {directory}")
#     except Exception as e:
#         print(f"Error during cleanup: {e}")



# #### flush db data /60min functionality ####


# ##-------------------------------------##
# ## flush db entries older than 60 minutes ####
# # def flush_old_materials():
# #     # Define the time threshold (e.g., 60 minutes old)
# #     time_threshold = datetime.utcnow() - timedelta(minutes=60)

# #     # Query for old materials
# #     old_materials = Material.query.filter(Material.created_at < time_threshold).all()

# #     # Delete old materials
# #     for material in old_materials:
# #         db.session.delete(material)

# #     db.session.commit()

    

# ##-------------------------------------##
# ## error handlers: catch errors thrown from @validates and other exceptions
# # @app.errorhandler(Exception)
# # def handle_general_error(e):
# #     app.logger.error(f'An unexpected error occurred: {str(e)}')
# #     return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

# # @app.errorhandler(404)
# # def handle_404(e):
# #     app.logger.warning("Resource not found")
# #     return jsonify({"error": "Resource not found"}), 404

# # @app.errorhandler(400)
# # def handle_400(e):
# #     app.logger.warning("Bad request")
# #     return jsonify({"error": "Bad request"}), 400

# # @app.errorhandler(500)
# # def handle_500_error(e):
# #     app.logger.error(f"Internal server error: {e}")
# #     return jsonify(error=str(e)), 500

    
# if __name__ == '__main__':
#     app.run(host="0.0.0.0", port=10000)
#     # port = int(os.environ.get('PORT', 10000))
#     # app.run(host='0.0.0.0', port=port, debug=False)

    
    