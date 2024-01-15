#!/usr/bin/env python3

# Standard library imports
import os

# Remote library imports
from flask import make_response, request, session, jsonify 
from flask_restful import Resource
import replicate

# Local imports
from models import db
from config import app, api

## api prefix for endpoints
URL_PREFIX = '/api'

##replicate API vars
replicate.api_token = os.getenv("REPLICATE_API_TOKEN")
#model_name = "stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478"


## HELPER FUNCTIONS/Vars ## 

material_data_example = {
    "materialType": {"value": "metallic", "label": "Metallic-Roughness"},
    "materialMetadata": [{"value": "maya", "label": "Maya"}, {"value": "redshift", "label": "Redshift"}],
    "color": "Blue",
    "elementType": "Ceramic",
    "condition": "Glossy",
    "manifestation": "Tile"
}


#ENDPOINTS/FUNCTIONALITY FOR GENERATING IMAGES FOR WEBPAGE:
##----------------------------------------##
##----------------------------------------##
@app.post(URL_PREFIX + '/generate_texture')
def generate_texture():
    # Extract the JSON data sent from the frontend
    form_data = request.get_json()
    material_data = form_data.get('materialData', {})

    try:
        prompt = construct_prompt_from_material_data(material_data)
        image_url = generate_image_from_prompt(prompt)
        return jsonify({"image_url": image_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def construct_prompt_from_material_data(material_data):
    # Extract relevant details
    color = material_data.get('color', 'default color').lower()
    material_type = material_data.get('materialType', {}).get('label', 'default material').lower()
    condition = material_data.get('condition', 'default condition').lower()
    manifestation = material_data.get('manifestation', 'default manifestation').lower()
    software = material_data.get('materialMetadata', {}).get('label', 'default software').lower()

    # Construct the prompt
    prompt = f"{condition} {color} {material_type} {manifestation} seamless texture, trending on artstation, base color, albedo, 4k"

    return prompt
  
def generate_image_from_prompt(prompt):
    try:
        # Specify the model name and parameters for replicate.run()
        model_name= "tommoore515/material_stable_diffusion:3b5c0242f8925a4ab6c79b4c51e9b4ce6374e9b07b5e8461d89e692fd0faa449"
        params = {
            "width": 512,  # or other desired dimensions
            "height": 512,
            "prompt": prompt,
            "num_outputs": 1,
            "guidance_scale": 7.5,
            "prompt_strength": 0.8,
            "num_inference_steps": 50
        }

        # Run the API call
        output = replicate.run(model_name, input=params)
        print("Raw output from Replicate:", output)

        # Check if the output is a list with a valid URL
        if isinstance(output, list) and output and isinstance(output[0], str):
            return output[0]
        else:
            raise Exception("Invalid output format")

    except Exception as e:
        print(f"An error occurred: {e}")
        raise Exception(f"Failed to generate image: {e}")
      

#ENDPOINTS FOR STORING FORMDATA IN DATABASE (not used rn):
##----------------------------------------##
##----------------------------------------##

@app.post( URL_PREFIX + '/upload_filedata')
def upload_metadata():
    data = request.json

    metadata = ImageMetadata(
        filename=data['filename'],
        size=data['size'],
        filetype=data['filetype'],
        exif=data.get('exif')
    )

    db.session.add(metadata)
    db.session.commit()

    return jsonify({'message': 'Metadata saved successfully'}), 201

def upload_materialdata():
    data = request.json
    material = Material(**data)  # Ensure this matches your Material model's structure
    db.session.add(material)
    db.session.commit()

    return jsonify({'message': 'Material data saved successfully'}), 201




## error handlers: catch errors thrown from @validates and other exceptions
@app.errorhandler(Exception)
def handle_errors(e):
    return {'error': f'Exception:{str(e)}'}, 404

@app.errorhandler(ValueError)
def handle_errors(e):
    return {"error": f"Value Error:{str(e)}"}, 422
    
if __name__ == '__main__':
    app.run(port=3000, debug=True)