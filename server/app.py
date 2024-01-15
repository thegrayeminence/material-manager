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
model_name = "stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478"

## HELPER FUNCTIONS ## 
def generate_image(prompt):
    #run API call
    output = replicate.run(model_name, input={"prompt": prompt})
    print("Raw output from Replicate:", output)
    url = output[0]
    if isinstance(output, list) and len(output) > 0 and isinstance(output[0], str):
        return url
    else:
        raise Exception(f"Failed to generate image: {output}")


#ENDPOINTS FOR GENERATING IMAGES FOR WEBPAGE:
##----------------------------------------##
##----------------------------------------##
@app.post(URL_PREFIX + '/generate_texture_from_form')
def generate_texture_from_form():
    data = request.json
    material_data = data['materialData']
    
    # Logic to construct prompt from material_data
    prompt = construct_prompt_from_material_data(material_data)
        
    try:
        image_url = replicate.run(model_name, input={"prompt": prompt})
        return jsonify({"image_url": image_url[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500



def construct_prompt_from_material_data(material_data):
    # Implement logic to construct the prompt based on material_data from frontend

    prompt = f"{material_data['color']} texture of {material_data['materialType']} ..."
    return prompt


def stable_diffusion_input_schema_format( resX, resY, prompt, scheduler, num_outputs, guidance_scale, prompt_strength, num_inference_steps ):
    
    input_schema = {
        "width": resX,
        "height": resY,
        "prompt": prompt,
        "scheduler": scheduler,
        "num_outputs": num_outputs,
        "guidance_scale": guidance_scale,
        "prompt_strength": prompt_strength,
        "num_inference_steps": num_inference_steps
    }
    return input_schema

    inputschemaexample = {
        "input_schema":{
      "seed": {
        "type": "integer",
        "title": "Seed",
        "x-order": 7,
        "description": "Random seed. Leave blank to randomize the seed"
      },
      "prompt": {
        "type": "string",
        "title": "Prompt",
        "default": "a vision of paradise. unreal engine",
        "x-order": 0,
        "description": "Input prompt"
      },
      "scheduler": {
        "allOf": [
          {
            "$ref": "#/components/schemas/scheduler"
          }
        ],
        "default": "DPMSolverMultistep",
        "x-order": 6,
        "description": "Choose a scheduler."
      },
      "num_outputs": {
        "type": "integer",
        "title": "Num Outputs",
        "default": 1,
        "maximum": 4,
        "minimum": 1,
        "x-order": 3,
        "description": "Number of images to output."
      },
      "guidance_scale": {
        "type": "number",
        "title": "Guidance Scale",
        "default": 7.5,
        "maximum": 20,
        "minimum": 1,
        "x-order": 5,
        "description": "Scale for classifier-free guidance"
      },
      "negative_prompt": {
        "type": "string",
        "title": "Negative Prompt",
        "x-order": 2,
        "description": "Specify things to not see in the output"
      },
      "image_dimensions": {
        "allOf": [
          {
            "$ref": "#/components/schemas/image_dimensions"
          }
        ],
        "default": "768x768",
        "x-order": 1,
        "description": "pixel dimensions of output image"
      },
      "num_inference_steps": {
        "type": "integer",
        "title": "Num Inference Steps",
        "default": 50,
        "maximum": 500,
        "minimum": 1,
        "x-order": 4,
        "description": "Number of denoising steps"
      }
    }}

    stable_diffusion_output_schema = {
        "type": "array",
        "items": {
            "type": "string",
            "format": "uri"
            },
        "title": "Output"
        }



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