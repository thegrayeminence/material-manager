# Standard library imports
import re, os, pathlib, zipfile, json, shutil, requests, logging, webbrowser
from datetime import datetime, timedelta
from logging.handlers import RotatingFileHandler
# other imports
from email.mime import base, image
from hmac import new
from nis import maps
from io import BytesIO
from pyexpat import model
from flask import Flask, render_template, make_response, jsonify, request, send_from_directory, url_for, session, current_app, send_file, redirect, after_this_request
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from flask_restful import Api, Resource
from dotenv import load_dotenv
import replicate
from werkzeug.utils import secure_filename
from PIL import Image, ImageOps

# local imports
from models import db, Material

load_dotenv()


app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/public',
    template_folder='../client/dist'
)




# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'])
# def catch_all(path):
#     return render_template("index.html")



# app.secret_key = os.environ.get("SECRET_KEY")
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {"pool_pre_ping": True} 


app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

# Instantiate REST API
# api = Api(app)

# CORS settings
CORS(app, resources={r"/api/*": {"origins": ["https://textureforgestatic.onrender.com", "https://www.textureforgestatic.onrender.com", "https://cdn.pbr.one","https://www.cdn.pbr.one", "http://localhost:3000", "https://textureforge.io", "https://www.textureforge.io" ]}, r"/assets/*": {"origins": ["https://textureforgestatic.onrender.com", "https://www.textureforgestatic.onrender.com", "https://cdn.pbr.one","https://www.cdn.pbr.one", "http://localhost:3000", "https://textureforge.io", "https://www.textureforge.io" ]}}
     )
# CORS(app, resources={r"/api/*": {"origins": "*"}})
# cors_config = {
#     #"origins": "*",
#     "origins": ["https://textureforgestatic.onrender.com", "https://cdn.pbr.one", "http://localhost:3000"],
#     "supports_credentials": True,
#     "allow_headers": ["Content-Type", "Authorization", "X-Requested-With", "X-CSRFToken", "Cache-Control"],
#     "expose_headers": ["Content-Disposition", "X-Suggested-Filename"],
#     "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
# }

# cors_config = {
#     "origins": ["https://textureforgestatic.onrender.com", "https://cdn.pbr.one", "http://localhost:3000"],
#     "supports_credentials": True,
    # "allow_headers": ["Content-Type", "Authorization", "X-Requested-With", "X-CSRFToken", "Cache-Control"],
    # "expose_headers": ["Content-Disposition", "X-Suggested-Filename"],
    # "methods": ["GET", "POST", "PUT", "DELETE"],
# }

# CORS(app, resources={
#                      r"/api/*": cors_config,
#                      r"/assets/*": cors_config,
#                      })





#load env variables
api_token = os.getenv("REPLICATE_API_TOKEN")
os.environ["REPLICATE_API_TOKEN"] = api_token

## initialize logging functionality

# Setup Logging
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
def get_material_urls(material_id):
    material = Material.query.get(material_id)
    if material:
        return {
            'base_color_url': material.base_color_url,
            'normal_map_url': material.normal_map_url,
            'height_map_url': material.height_map_url,
            'smoothness_map_url': material.smoothness_map_url
        }
    else:
        return None



# ##------FUNCTIONS for API Calls/Generating Textures/Handling Prompts and MaterialData------##
# ##----------------------------------------------------##

## TURNS MATERIAL DATA INTO PROMPT FOR GENERATING TEXTURE:
def construct_prompt_from_material_data(material_data):
    try:
      # Extract physical properties of materials from materialData json
      color = material_data.get('color', 'brown').lower()
      elementType = material_data.get('elementType', 'mahogany').lower()
      #material_type = material_data.get('materialType', {}).get('label', 'PBR material').lower()
      condition = material_data.get('condition', 'flooring').lower()
      manifestation = material_data.get('manifestation', 'stained').lower()
      #software = [{'Program': item.get('label', 'default software').lower()} for item in material_data.get('materialMetadata', [])]
      #maps = [{'Map': item.get('label', 'default map').lower()} for item in material_data.get('materialTextures', [])]
    
      # Construct prompt
      prompt = f"{condition} {color} {elementType} {manifestation} seamless texture, trending on artstation, base color, albedo, 4k"
    #   app.logger.info("Generated prompt: %s", prompt)
      return prompt
    
    except Exception as e:
        # app.logger.error('Error in construct_prompt_from_material_data: %s', str(e))
        return make_response({"error in construct_prompt_from_material_data": str(e)}, 500)
        




# ##------API CALLS------##
# ##----------------------------------------##

##FIRST API CALL FOR ALBEDO MAP:
def generate_image_from_prompt(model_identifier, prompt, params):
    try:
        ##PUBLIC MODEL SETUP:
        output = replicate.run(model_identifier, input=params)
        # app.logger.info("Output from Replicate: %s", output)

        # Check if the output is a list with a valid URL
        if output and isinstance(output[0], str):
            return output[0]
        else:
            raise Exception("Invalid output format")
        
        
        ##CUSTOM DEPLOYED MODEL SETUP:
        # deployment = replicate.deployments.get(model_identifier)
        # prediction = deployment.predictions.create(input=params)
        # prediction.wait()

        # if prediction.status == 'succeeded':
        #     return prediction.output
        # else:
        #     raise Exception(f"Failed to generate image: {prediction.status}")


    # except Exception as e:
    #     print(f"An error occurred: {e}")
    #     raise Exception(f"Failed to generate image: {e}")
    except Exception as e:
        # app.logger.error('Error in generate_image_from_prompt: %s', str(e))
        return make_response({"error in generate_image_from_prompt": str(e)}, 500)
  
# ##SECOND API CALL FOR ALBEDO TO PBR MAPS:  
def generate_pbr_from_albedo(base_color_url, map_type):
    try:
        ##PUBLIC MODEL SETUP:
        params = {"model": map_type, "imagepath": base_color_url}
        model_identifier = "tommoore515/pix2pix_tf_albedo2pbrmaps:21bd96b6e69f40e54502d67798f9025ab9e4a9e08f2a1b51dde5131b129a825e"
        # app.logger.info(f"Attempting to generate {map_type} map from {base_color_url}")
        output = replicate.run(model_identifier, input=params)

        if output and isinstance(output, str):
            # app.logger.info(f"{map_type} Map generated: {output}")
            return output
        else:
            raise Exception(f"Invalid output format for {map_type}")
        
        #CUSTOM MODEL SETUP:
        # model_identifier = "thegrayeminence/albedo-to-pbr-generator"
        # params = {"model": map_type, "imagepath": base_color_url}
        # deployment = replicate.deployments.get(model_identifier)
        # prediction = deployment.predictions.create(input=params)
        # prediction.wait()
        
        # if prediction.status == 'succeeded':
        #     return prediction.output
        # else:
        #     raise Exception(f"Failed to generate PBR map: {prediction.status}")
        
        
    except Exception as e:
        # app.logger.error('Error in generate_pbr_from_albedo: %s', str(e))
        return make_response({"error in generate_pbr_from_albedo": str(e)}, 500)
          
          
          
          
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




# ## CLIENT --> SERVER ENDPOINTS ####:
# ##----------------------------------------##


    

# ## first endpoint for generating albedo
@app.route("/api/generate_albedo", methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
@cross_origin()
def generate_albedo():
    
    ##model_identifier options (plus custom vs public) ##
    custom_model = "thegrayeminence/albedo-generator"
    mat_diffusion = "tstramer/material-diffusion:a42692c54c0f407f803a0a8a9066160976baedb77c91171a01730f9b0d7beeff"
    mat_diffusion_tom = "tommoore515/material_stable_diffusion:3b5c0242f8925a4ab6c79b4c51e9b4ce6374e9b07b5e8461d89e692fd0faa449"
    mat_diffusion_pwntus = "pwntus/material-diffusion-v2.1:3f4feccac74913263224bf3893024822c559d225110879fb7fc2d940011c5988"
    mat_diffusion_sdxl = "pwntus/material-diffusion-sdxl:ce888cbe17a7c04d4b9c4cbd2b576715d480c55b2ba8f9f3d33f2ad70a26cd99"
    
    ##!!! mat diffusion model to use; CHANGE THIS VAR to switch between models for text-->image generation !!!###
    model_identifier = mat_diffusion
    
    try:
        ##values/parameters for generate_image_from_prompt() argument
        material_data = request.get_json().get('materialData', {})
        prompt = construct_prompt_from_material_data(material_data)
        
        ##params options (different schema required for pwntus and sdxl models)##
        ## default params for mat diffusion models
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
        ##params for pwntus model
        params_pwntus = {
            "width": 768,
            "height": 768,
            "prompt": prompt,
            "scheduler": "DPMSolverMultistep",
            "num_outputs": 1,
            "guidance_scale": 7.5,
            "prompt_strength": 0.8,
            "num_inference_steps": 50
        }
        params_sdxl = {
            "width": 768,
            "height": 768,
            "prompt": prompt,
            # "refine": "expert_ensemble_refiner",
            "scheduler": "DDIM",
            "num_outputs": 1,
            "guidance_scale": 7.5,
            "apply_watermark": False,
            "high_noise_frac": 0.8,
            "num_inference_steps": 50
        }
        
        ##generating image_uri from matdata/prompt/params/etc values
        base_color_url = generate_image_from_prompt(model_identifier, prompt, params)
        # app.logger.info(base_color_url)
        
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
            base_color_url=base_color_url
        )
        db.session.add(new_material)
        db.session.commit()
        # app.logger.info("Albedo map generated successfully.")
        response = jsonify({'base_color_url': base_color_url, 'material_id': new_material.id, 'material_name': new_material.prompt})
        # response.headers.add('Access-Control-Allow-Origin', '*')
        # response.headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        # response.headers.add("Access-Control-Allow-Headers", "Content-Type");
        return response, 200
    
    except Exception as e:
        db.session.rollback()
        # app.logger.error('Error in generate_albedo: %s', str(e))
        return make_response({"error in generate_albedo": str(e)}, 500)


# #second endpoint for generating pbr maps from albedo
@app.route("/api/generate_pbr_maps", methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
@cross_origin()
def generate_pbr_maps():
    try:
        data = request.get_json()
        material_id = data.get('material_id')
        base_color_url = data.get('base_color_url')
        map_types = ["albedo2normal", "albedo2height", "albedo2smoothness"]
        pbr_maps = {}
        
        print("Preparing to generate pbrs from albedo...")
        for map_type in map_types:
            print(f"Generating {map_type} map...")
            pbr_map_url = generate_pbr_from_albedo( base_color_url, map_type)
            pbr_maps[map_type] = pbr_map_url

        material = Material.query.get(material_id)
        if material:
            material.normal_map_url = pbr_maps.get("albedo2normal")
            material.height_map_url = pbr_maps.get("albedo2height")
            material.smoothness_map_url = pbr_maps.get("albedo2smoothness")
            db.session.commit()
            # app.logger.info("PBR maps generated successfully.")
            return jsonify({'pbr_maps': pbr_maps}), 200
        else:
            return make_response({"error": "Material not found"}, 404)
    
    except Exception as e:
            db.session.rollback()
            # app.logger.error('Error in generate_pbr_maps: %s', str(e))
            return make_response({"error in generate_pbr_maps": str(e)}, 500)





# ######## Server-->Client ENDPOINTS ######
# ##-------------------------------------##
# ## GET Generated Images from DB ####
@app.route("/api/get_albedo_maps",  methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
def get_albedo_maps():
    try:
        materials = Material.query.all()
        images_urls = [material.base_color_url for material in materials]
        return jsonify({'image_urls': images_urls}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    



@app.route("/api/get_maps/<int:material_id>",  methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
def get_maps_by_id(material_id):
    material_urls = get_material_urls(material_id)
    if material_urls:
        return make_response({'image_urls': material_urls}), 200
    else:
        return make_response({"error": "Material not found"}), 404


@app.get("/api/get_albedo_by_id/<int:material_id>")
def get_albedo_by_id(material_id):
    material_urls = get_material_urls(material_id)
    if material_urls:
        return make_response({'base_color_url': material_urls['base_color_url'], 'material_id': material_id}), 200
    else:
        return make_response({"error": "Material not found"}), 404

@app.get("/api/get_pbr_by_id/<int:material_id>")
def get_pbr_by_id(material_id):
    material_urls = get_material_urls(material_id)
    if material_urls:
        image_urls = {'normal': material_urls['normal_map_url'], 'height': material_urls['height_map_url'], 'smoothness': material_urls['smoothness_map_url']}
        return make_response({'image_urls': image_urls}), 200
    else:
        return make_response({"error": "Material not found"}), 404

@app.get("/api/get_normal_by_id/<int:material_id>")
def get_normal_by_id(material_id):
    material_urls = get_material_urls(material_id)
    if material_urls:
        return make_response({'image_url': material_urls['normal_map_url']}), 200
    else:
        return make_response({"error": "Material not found"}), 404

@app.get("/api/get_height_by_id/<int:material_id>")
def get_height_by_id(material_id):
    material_urls = get_material_urls(material_id)
    if material_urls:
        return make_response({'image_url': material_urls['height_map_url']}), 200
    else:
        return make_response({"error": "Material not found"}), 404

@app.get("/api/get_smoothness_by_id/<int:material_id>")
def get_smoothness_by_id(material_id):
    material_urls = get_material_urls(material_id)
    if material_urls:
        return make_response({'image_url': material_urls['smoothness_map_url']}), 200
    else:
        return make_response({"error": "Material not found"}), 404
    

@app.route("/api/get_recent_pbrs",  methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
def get_recent_pbrs():
    try:
        material = Material.query.order_by(Material.id.desc()).first()
        if material:
            material_urls = get_material_urls(material.id)
            image_urls = [material_urls['normal_map_url'], material_urls['height_map_url'], material_urls['smoothness_map_url']]
            return make_response({'image_url': image_urls, 'material_id': material.id}), 200
        else:
            return make_response({"error": "No recent PBRs found"}), 404
    except Exception as e:
        return make_response({"error": str(e)}), 500
    
    
@app.route("/api/get_recent_albedo",  methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
def get_recent_albedo():
    try:
        material = Material.query.order_by(Material.id.desc()).first()
        if material:
            material_urls = get_material_urls(material.id)
            return make_response({'base_color_url': material_urls['base_color_url'], 'material_id': material.id}), 200
        else:
            return make_response({"error": "No recent albedo found"}), 404
    except Exception as e:
        return make_response({"error": str(e)}), 500

@app.get("/api/recent_materials")
def get_last_five_materials():
    try:
        materials = Material.query.order_by(Material.id.desc()).limit(5).all()
        if materials:
            material_urls = [get_material_urls(material.id) for material in materials]
            material_ids = [material.id for material in materials]
            return make_response({'urls': material_urls, 'ids': material_ids}), 200
        else:
            return make_response({"error": "No recent materials found"}), 404
    except Exception as e:
        return make_response({"error": str(e)}), 500
    

# ##-------------------------------------##
# ## Static Image Serving/Downloading: Useful Endpoints ##

@app.route('/api/all_images',  methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
def get_all_images():
    images_dir_path = os.path.join(app.static_folder, 'assets', 'images')
    folders = [name for name in os.listdir(images_dir_path) if os.path.isdir(os.path.join(images_dir_path, name))]
    print(folders)
    all_folders_images = []
    
    try:
        for folder_name in folders:
            folder_path = os.path.join(app.static_folder, 'assets', 'images', folder_name)
            image_files_unsorted  = [f for f in os.listdir(folder_path) if f.endswith('.png')]
            # image_urls = [url_for('static', filename=f'assets/images/{folder_name}/{file}', _external=True) for file in image_files]
       
            # map_types = ['base_color.png', 'height.png', 'normal.png', 'smoothness.png']
            # images = [f"{images_dir_path}/{folder_name}/{folder_name}_{map_type}" for map_type in map_types]
            image_files = sorted(image_files_unsorted)
            images = [url_for('static', filename=f'assets/images/{folder_name}/{file}', _external=True) for file in image_files]
     
            folder_images = {
                "folder": folder_name.title(),
                "images": images
            }
            all_folders_images.append(folder_images)
        
        return jsonify(all_folders_images), 200
    
    except Exception as e:
        return make_response({f"error in fetching folders from {images_dir_path}": str(e)}), 500
    

def compress_png(input_path, output_path):
    with Image.open(input_path) as img:
        new_width = img.width // 2
        new_height = img.height // 2

        resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        resized_img.save(output_path, format='PNG', optimize=True, compression_level=6)
        
def compress_jpg(input_path, output_path, quality):
    with Image.open(input_path) as img:
        
        new_width = img.width
        new_height = img.height
        
        resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        resized_img.save(output_path, format='JPEG', quality=quality, optimize=True, progressive=True)

@app.route('/api/gallery_images',  methods=["GET", "POST", "OPTIONS"])
def get_gallery_images():
    images_dir_path = os.path.join(app.static_folder, 'assets', 'images')
    folders = [name for name in os.listdir(images_dir_path) if os.path.isdir(os.path.join(images_dir_path, name))]
    all_folders_images = []
    
    try:
        for folder_name in folders:
            folder_path = os.path.join(app.static_folder, 'assets', 'images', folder_name)
            placeholder_folder_path = os.path.join(folder_path, 'placeholders')
            os.makedirs(placeholder_folder_path, exist_ok=True)  

            image_files_unsorted = [f for f in os.listdir(folder_path) if f.endswith('.png') and not f.startswith('placeholder_')]
            base_color_file = [f for f in os.listdir(folder_path) if f.endswith('_base_color.png') and not f.startswith('placeholder_') and not f.startswith('small_')]
            image_files = sorted(image_files_unsorted)
            images = [url_for('static', filename=f'assets/images/{folder_name}/{file}', _external=True) for file in image_files]
     
            #placeholder functionality, normal and small; disable compression function unless placeholder folders empty
            input_image_path = os.path.join(folder_path, base_color_file[0])
            placeholder_image_name = f'placeholder_{base_color_file[0].rsplit(".", 1)[0]}.jpg'
            small_placeholder_image_name = f'small_placeholder_{base_color_file[0].rsplit(".", 1)[0]}.jpg'
            placeholder_image_path = os.path.join(placeholder_folder_path, placeholder_image_name)
            small_placeholder_image_path = os.path.join(placeholder_folder_path, small_placeholder_image_name)
            # compress_jpg(input_image_path, placeholder_image_path, quality=50)
            # compress_jpg(input_image_path, small_placeholder_image_path, quality=10)


            placeholder_url = url_for('static', filename=f'assets/images/{folder_name}/placeholders/{placeholder_image_name}', _external=True)
            small_placeholder_url = url_for('static', filename=f'assets/images/{folder_name}/placeholders/{small_placeholder_image_name}', _external=True)

            folder_images = {
                "folder": folder_name,
                "title": folder_name.title(),
                "image": images[0],
                "placeholder": placeholder_url,
                "small_placeholder": small_placeholder_url
            }
            all_folders_images.append(folder_images)
        
        return jsonify(all_folders_images), 200
    
    except Exception as e:
        return make_response({f"error in fetching folders from {images_dir_path}": str(e)}), 500
            
@app.get('/api/image_folders')
def get_image_folders():
    images_dir_path = os.path.join(app.static_folder, 'assets', 'images')
    # if not os.path.exists(images_dir_path) or not os.path.isdir(images_dir_path):
    #     return jsonify({"error": f"Folder not found; folder info \n path_static:{images_dir_path} \n "}), 404
    folders = [name for name in os.listdir(images_dir_path) if os.path.isdir(os.path.join(images_dir_path, name))]
    all_folders_names = []
    try:
        for folder_name in folders:
            all_folders_names.append(folder_name.title())
        return make_response({"folders": all_folders_names}), 200
    
    except Exception as e:
        return make_response({f"error in fetching folders from {images_dir_path}": str(e)}), 500        


@app.route('/api/images/<folder_name>', methods=["GET", "POST", "OPTIONS"])
def get_images(folder_name):
    folder_path = os.path.join(app.static_folder, 'assets', 'images', folder_name)
    try:
        image_files_unsorted = [f for f in os.listdir(folder_path) if f.endswith('.png')]
        image_files = sorted(image_files_unsorted)
       
        image_urls = [url_for('static', filename=f'assets/images/{folder_name}/{file}', _external=True) for file in image_files]

        
        smoothness_map = Image.open(f"{folder_path}/{folder_name}_smoothness.png")
        smoothness_map_inverted = ImageOps.invert(smoothness_map)
        smoothness_map_inverted.save(f"{folder_path}/{folder_name}_roughness.png")
        smothness_map_inverted_url = url_for('static', filename=f'assets/images/{folder_name}/{folder_name}_roughness.png', _external=True)
        
        # image_urls.append(smothness_map_inverted_url)
        return make_response({"material_name": folder_name, "image_files":image_files, "image_urls": image_urls, "roughness":smothness_map_inverted_url}, 200)
    
    except Exception as e:
        return jsonify({"error in fetching static images": str(e)}), 500



##-------------------------------------##
## Image Download Functionality: downloads relating to images generated by SD (i.e. not static images) ##

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

        
def create_downloadable_zip(material_id):
    
    material = Material.query.get(material_id)
    if not material:
        raise FileNotFoundError("Material not found")

    # Construct folder name based on material attributes
    folder_name = f"{material.color}_{material.element}_{material.manifestation}_{material.condition}"
    temp_images_dir = os.path.join(current_app.root_path, 'temp_images', folder_name)
    os.makedirs(temp_images_dir, exist_ok=True)
    
    # app.logger.info(f"folder_name: {folder_name}")
    print(f"folder_name: {folder_name}")
    
    zip_filename = os.path.join(temp_images_dir, f"{folder_name}.zip")
    # app.logger.info(f"Creating zip file at: {zip_filename}")
    print(f"Creating zip file at: {zip_filename}")

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


##gets proper filename for zip file/unzipped folder
@app.route("/api/get_material_filename/<int:material_id>",  methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
def get_material_filename(material_id):
    try:
        material = Material.query.get(material_id)
        if not material:
            return jsonify({"error": "Material not found"}), 404
        filename = f"{material.color}_{material.element}_{material.manifestation}_{material.condition}.zip"
        name = f"{material.color} {material.element} {material.manifestation} {material.condition}".title()
        return jsonify({"filename": filename, "name": name}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route("/api/download_material/<int:material_id>",  methods=["GET", "POST", "PUT", "PATCH", "OPTIONS"])
def download_material(material_id):
    try:
        zip_file_path = create_downloadable_zip(material_id)
        directory = os.path.dirname(zip_file_path)
        filename = os.path.basename(zip_file_path)
        
        response = send_from_directory(directory, filename, as_attachment=True)
        # app.logger.info(f"Serving zip from: {zip_file_path} to: {directory} with filename: {filename}")
        print(f"Serving zip from: {zip_file_path} to: {directory} with filename: {filename}")
        # Clean up after sending the file
        cleanup_temporary_directory(directory) 
        return response
    except Exception as e:
        # app.logger.error(f"Error in download_material: {e}")
        return jsonify({"Error in download_material": str(e)}), 500



# ##-------------------------------------##
# ##CLEANUP FUNCTIONALITY:

def cleanup_temporary_directory(directory):
    try:
        shutil.rmtree(directory)
        print(f"Cleaned up temporary directory: {directory}")
    except Exception as e:
        print(f"Error during cleanup: {e}")



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


    
if __name__ == '__main__':
    # app.run(host="0.0.0.0", port=10000)
    port = int(os.environ.get('PORT', 10000))
    app.run(host='0.0.0.0', port=port)

    
    