#!/usr/bin/env python3

# Standard library imports
import os
import json

# Remote library imports
from flask import request, jsonify 
import replicate

# Local imports
from models import db, Material
from config import app

## Replicate API token set-up
os.environ["REPLICATE_API_TOKEN"] = os.getenv("REPLICATE_API_TOKEN")

## Replicate Deployed Models
albedo_to_pbr_deployment = replicate.deployments.get("thegrayeminence/albedo-to-pbr")


##------HELPER FUNCTIONS FOR GENERATING TEXTURES------##
def construct_prompt_from_material_data(material_data):
    # ... [unchanged code] ...

def generate_image_from_prompt(prompt):
    try:
        model_name = "tstramer/material-diffusion:a42692c54c0f407f803a0a8a9066160976baedb77c91171a01730f9b0d7beeff"
        params = {
            "width": 512,
            "height": 512,
            "prompt": prompt,
            "scheduler": "K-LMS",
            "num_outputs": 1,
            "guidance_scale": 7.5,
            "prompt_strength": 0.8,
            "num_inference_steps": 50
        }

        output = replicate.run(model_name, input=params)
        if output and isinstance(output[0], str):
            return output[0]
        else:
            raise Exception("Invalid output format")

    except Exception as e:
        raise Exception(f"Failed to generate image: {e}")
      
def generate_pbr_from_albedo(base_color_url, map_type):
    generated_maps = {}
    try:
        prediction = albedo_to_pbr_deployment.predictions.create(
            input={"model": map_type, "imagepath": base_color_url}
        )
        prediction.wait()

        if prediction.output:
            generated_maps[map_type] = prediction.output
        else:
            raise Exception(f"Invalid output format for {map_type}")

    except Exception as e:
        print(f"Error generating {map_type} map: {e}")
        generated_maps[map_type] = None

    return generated_maps

## CLIENT --> SERVER ENDPOINTS:
# ... [unchanged code] ...

if __name__ == '__main__':
    app.run(port=3001, debug=True)
