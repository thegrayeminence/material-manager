##standard library imports
from random import randint, choice
from datetime import datetime
import json
import os 

##local imports
from config import app
from models import db, StaticMaterial

      
    
if __name__ == "__main__":
    
    with app.app_context():
        print("deleting old entries")
        StaticMaterial.query.delete()
       
        print("seeding new static materials database")
        
        # BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', ''))
        # images_dir_path = os.path.join(BASE_DIR, 'server', 'static', 'assets', 'images')
        images_dir_path = app.static_folder + '/assets/images'
        print(f"images directory:{images_dir_path}")
    
        folders = [name for name in os.listdir(images_dir_path) if os.path.isdir(os.path.join(images_dir_path, name))]
        print(folders)
        
        material_list = []
        map_types = ['base_color.png', 'height.png', 'normal.png', 'smoothness.png']
        for folder_name in folders:
            # image_files = [f for f in os.listdir(folder_path) if f.endswith('.png')]
            # image_urls = [url_for('static', filename=f'assets/images/{folder_name}/{file}', _external=True) for file in image_files]
       
            images = [f"{images_dir_path}/{folder_name}/{folder_name}_{map_type}" for map_type in map_types]
            prompt = folder_name
            m = StaticMaterial(
                base_color_url = images[0],
                normal_map_url = images[1],
                height_map_url = images[2],
                smoothness_map_url = images[3],
                prompt = prompt
            )
            material_list.append(m)
            

        db.session.add_all(material_list)
        db.session.commit()
        print("seeded materials")

    print("done seeding...")