#!/usr/bin/env python3

# Standard library imports
from email.mime import base
from hmac import new
from nis import maps
import os
import json

# Remote library imports
from flask import make_response, request, session, jsonify 
from flask_restful import Resource
import replicate

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

## MAKES API CALL TO REPLICATE TO GENERATE TEXTURE USING PROMPT, RETURNS URL AS OUTPUT###
def generate_image_from_prompt(prompt):
    try:
        # Specify the model name and parameters for replicate.run()
        # replicate.api_token = os.getenv("REPLICATE_API_TOKEN")
        os.environ["REPLICATE_API_TOKEN"] = "r8_UG5Hm4swKAvk3K39YmcsMFqwuHlUELh3AAXCJ"
        model_name= "tommoore515/material_stable_diffusion:3b5c0242f8925a4ab6c79b4c51e9b4ce6374e9b07b5e8461d89e692fd0faa449"
        params = {
            "width": 512, 
            "height": 512,
            "prompt": prompt,
            "num_outputs": 1,
            "guidance_scale": 7.5,
            "prompt_strength": 0.8,
            "num_inference_steps": 50
        }

        # Run the API call
        output = replicate.run(model_name, input=params)
        print("Logging output from Replicate:", output)

        # Check if the output is a list with a valid URL
        if isinstance(output, list) and output and isinstance(output[0], str):
            print("Image URL:", output[0])
            return output[0]
        else:
            raise Exception("Invalid output format")

    except Exception as e:
        print(f"An error occurred: {e}")
        raise Exception(f"Failed to generate image: {e}")
      



## CLIENT --> SERVER ENDPOINTS: GENERATE TEXTURES FOR WEBPAGE:
##----------------------------------------##
## GET MATERIAL DATA FROM FORMDATA, EXTRACT PROMPT:
@app.route("/api/generate_texture", methods=['POST'])
def generate_texture():
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

        return jsonify({'image_url': image_url}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500









######## Server-->Client ENDPOINTS ######
##-------------------------------------##
## GET Generated Images from DB ####
@app.route("/api/get_generated_textures", methods=['GET'])
def get_generated_textures():
    try:
        materials = Material.query.all()
        images_urls = [material.base_color_url for material in materials]
        return jsonify({'image_urls': images_urls}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500




## error handlers: catch errors thrown from @validates and other exceptions
@app.errorhandler(Exception)
def handle_errors(e):
    return {'error': f'Exception:{str(e)}'}, 404

@app.errorhandler(ValueError)
def handle_errors(e):
    return {"error": f"Value Error:{str(e)}"}, 422
    
if __name__ == '__main__':
    app.run(port=3001, debug=True)
    
    


### PLACEHOLDER DATA FOR TESTING ###
##----------------------------------------##
material_data_example = {
  "materialData": {
    "materialTextures": [
      {
        "value": "baseColor",
        "label": "Base Color"
      },
      {
        "value": "normal",
        "label": "Normal Map"
      },
      {
        "value": "height",
        "label": "Height Map"
      },
      {
        "value": "metallic",
        "label": "Metallic"
      },
      {
        "value": "roughness",
        "label": "Roughness"
      },
      {
        "value": "ambientOcclusion",
        "label": "Ambient Occlusion"
      },
      {
        "value": "emissive",
        "label": "Emissive"
      }
    ],
    "materialType": {
      "value": "metallic",
      "label": "Metallic-Roughness"
    },
    "materialMetadata": [
      {
        "value": "unreal",
        "label": "Unreal Engine"
      },
      {
        "value": "cinema4D",
        "label": "Cinema 4D"
      }
    ],
    "color": "Burnished",
    "elementType": "Copper",
    "condition": "Striated",
    "manifestation": "Tiles"
  }
}
