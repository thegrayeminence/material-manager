# Standard library imports
import re, os, pathlib
# Remote library imports
from flask import Flask, render_template
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData



# Instantiate app, set attributes
app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/dist',
    template_folder='../client/dist'
)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

# isss a secret, no looksy precious
app.secret_key = os.environ.get("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

## SQL DB config ##
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

# CORS settings
CORS(app, resources={
    r"/api/*": {"origins": ["https://textureforge.onrender.com","https://textureforgestatic.onrender.com", "http://localhost:3000", "https://cdn.pbr.one","http://cdn.pbr.one"],},
    r"/*": {"origins": ["https://textureforge.onrender.com", "https://textureforgestatic.onrender.com" , "http://localhost:3000", "https://cdn.pbr.one","http://cdn.pbr.one"]},
    r"/assets/*": {"origins": ["https://textureforge.onrender.com", "https://textureforgestatic.onrender.com" , "http://localhost:3000", "https://cdn.pbr.one","http://cdn.pbr.one"]}

    })

# cors_config = {
#     "origins": ["https://textureforgestatic.onrender.com", "https://cdn.pbr.one", "http://localhost:3000"],
#     "supports_credentials": True,
    # "allow_headers": ["Content-Type", "Authorization", "X-Requested-With", "X-CSRFToken", "Cache-Control"],
    # "expose_headers": ["Content-Disposition", "X-Suggested-Filename"],
    # "methods": ["GET", "POST", "PUT", "DELETE"],
# }
# CORS(app, resources={r"/api/*": cors_config, 
#                      })

# unsafe cors settings (dev only)
# CORS(app, origins='*')


