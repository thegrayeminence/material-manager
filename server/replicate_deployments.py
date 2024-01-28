
import replicate



####### API CALL TO GENERATE PBR TEXTURES ONE AT A TIME #######
##--------------------------------------------------------##

# def generate_specific_pbr_map(map_type):
#     pbr_maps = {}
#     try:
#         data = request.get_json()
#         base_color_url = data.get('base_color_url')
#         if not base_color_url:
#             return jsonify({"error": "Albedo URL is required"}), 400

#         print(f"Generating {map_type} map...")
#         map_output = generate_pbr_from_albedo(base_color_url, map_type)
#         pbr_maps.update(map_output)

#         material_id = data.get('material_id')
#         if not material_id:
#             return jsonify({"error": "material_id is required"}), 400

#         material = Material.query.get(material_id)
#         if material:
#             setattr(material, f"{map_type}_url", pbr_maps.get(map_type))
#             db.session.commit()
#             return jsonify({"message": f"{map_type} map generated successfully", "pbr_map": pbr_maps[map_type]}), 200
#         else:
#             return jsonify({"error": "Material not found"}), 404
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500




# Function for Text-to-Image generation
def generate_image_from_prompt(model_identifier, prompt, params):
    try:
        deployment = replicate.deployments.get(model_identifier)
        prediction = deployment.predictions.create(input=params)
        prediction.wait()

        if prediction.status == 'succeeded':
            return prediction.output
        else:
            raise Exception(f"Failed to generate image: {prediction.status}")

    except Exception as e:
        print(f"An error occurred: {e}")
        raise Exception(f"Failed to generate image: {e}")
        #return jsonify({"error": str(e)}), 500


# Flask route to generate albedo map
@app.route("/api/generate_albedo", methods=["POST"])
def generate_albedo():
    try:
        ##setting up values/parameters for generate_image_from_prompt() argument
        material_data = request.get_json().get('materialData', {})
        prompt = construct_prompt_from_material_data(material_data)
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
        model_identifier = "thegrayeminence/albedo-generator"
        
        ##generating image_uri from matdata/prompt/params/etc values
        image_url = generate_image_from_prompt(model_identifier, prompt, params)
        
        ##instantiating new material to store in db
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




def generate_pbr_from_albedo(model_identifier, base_color_url, map_type):
    try:
        params = {
            "model": map_type,
            "imagepath": base_color_url
        }

        deployment = replicate.deployments.get(model_identifier)
        prediction = deployment.predictions.create(input=params)
        prediction.wait()

        if prediction.status == 'succeeded':
            return prediction.output
        else:
            raise Exception(f"Failed to generate PBR map: {prediction.status}")

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    



# Route for generating PBR maps (Image-to-Image)
@app.route("/api/generate_pbr_maps", methods=["POST"])
def generate_pbr_maps():
    try:
        data = request.get_json()
        base_color_url = data.get('base_color_url')
        map_type = data.get('map_type')  # e.g., "albedo2normal"
        model_identifier = "thegrayeminence/albedo-to-pbr-generator"
        pbr_map_url = generate_pbr_from_albedo(model_identifier, base_color_url, map_type)

        # Additional logic to update Material with PBR map URL
        # ...

        return jsonify({'pbr_map_url': pbr_map_url}), 200

    except Exception as e:
        app.logger.error('Error in generate_pbr_maps: %s', str(e))
        return jsonify({"error": str(e)}), 500





if __name__ == "__main__":
    app.run(debug=True)
















##OLD CODE 
# # Define function to generate image from prompt using custom model
# def generate_image_from_prompt(model_identifier, prompt):
#     # Parameters for first api call's model
#     params = {
#         "width": 512,
#         "height": 512,
#         "prompt": prompt,
#         "scheduler": "K-LMS",
#         "num_outputs": 1,
#         "guidance_scale": 7.5,
#         "prompt_strength": 0.8,
#         "num_inference_steps": 50
#     }
#     try:
     
#         # Create prediction using model/params
#         deployment = replicate.deployments.get(model_identifier)
#         prediction = deployment.predictions.create(input=params)
#         prediction.wait()  # Wait for the prediction to complete
        
#         # Check and return the output
#         if prediction.status == 'succeeded':
#             return prediction.output
#         else:
#             raise Exception(f"Failed to generate image: {prediction.status}")

#     except Exception as e:
#         print(f"An error occurred: {e}")
#         raise Exception(f"Failed to generate image: {e}")
    
    
    
    

# # Function to deploy custom model(s)
# def deploy_custom_model(name, hardware):
#     model = replicate.models.create(
#         owner="thegrayeminence",
#         name=name,
#         visibility="public",
#         hardware=hardware
#     )
#     print(model)
#     return model.identifier  # Return the identifier of the model

# # Deploying models
# albedo_model_identifier = deploy_custom_model(name="albedo-generator", hardware="gpu-a40-large")
# pbr_model_identifier = deploy_custom_model(name="albedo-to-pbr-generator", hardware="gpu-a40-large")
