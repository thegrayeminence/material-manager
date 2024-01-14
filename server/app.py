#!/usr/bin/env python3

# Standard library imports
import os
import re

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
# def generate_image(prompt):
#     #run API call
#     output = replicate.run(model_name, input={"prompt": prompt})
#     print("Raw output from Replicate:", output)

#     if isinstance(output, list) and len(output) > 0 and isinstance(output[0], str):
#         return output[0]
#     else:
#         raise Exception(f"Failed to generate image: {output}")

##endpoints##
@app.post(URL_PREFIX + '/generate_image')
def generate_image():
    data = request.json
    prompt = data['prompt']
    
    try:
        image_url = replicate.run(model_name, input={"prompt": prompt})
        return jsonify({"image_url": image_url[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500



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
    app.run(port=5555, debug=True)