
# Install the Replicate client (execute in terminal)
# pip install replicate

# Set the API token as an environment variable (execute in terminal)
# export REPLICATE_API_TOKEN=<your token>

import replicate


# deploy custom model(s)
def deploy_custom_model(name, hardware):
    model = replicate.models.create(
        owner="thegrayeminence",
        name=name,
        visibility="public",
        hardware=hardware
    )
    return model
custom_model_albedo = deploy_custom_model(name="albedo-generator",hardware="gpu-a40-large")


# Print the model details
print(model)


from flask import Flask, request, jsonify
import replicate
import os

# Initialize Flask app and other necessary setups
app = Flask(__name__)
load_dotenv()
api_token = os.getenv("REPLICATE_API_TOKEN")
os.environ["REPLICATE_API_TOKEN"] = api_token

# Define helper function to construct prompt
def construct_prompt_from_material_data(material_data):
    # Existing implementation
    ...

# Define function to generate image from prompt using custom model
def generate_image_from_prompt(prompt):
    try:
        # Identifier for your deployed custom model
        custom_model_identifier = "thegrayeminence/albedo-generator"

        # Parameters for your custom model
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

        # Create a prediction using your custom model
        deployment = replicate.deployments.get(custom_model_identifier)
        prediction = deployment.predictions.create(input=params)
        prediction.wait()  # Wait for the prediction to complete

        # Check and return the output
        if prediction.status == 'succeeded':
            return prediction.output
        else:
            raise Exception(f"Failed to generate image: {prediction.status}")

    except Exception as e:
        print(f"An error occurred: {e}")
        raise Exception(f"Failed to generate image: {e}")

# Flask route to generate albedo map
@app.route("/api/generate_albedo", methods=["POST"])
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

# Other parts of your Flask app
...

if __name__ == "__main__":
    app.run(debug=True)
