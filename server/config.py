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
    # static_folder='./static',
    template_folder='../client/dist' 
)


##sets up default/fallback flask route to html file
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

# Instantiate CORS
CORS(app, resources={
    
    
    r"/api/*": {
        "origins": ["https://textureforge.onrender.com", "http://localhost:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE"]
    },
    r"/static/*": {
        "origins": ["https://textureforge.onrender.com", "http://localhost:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE"]
    },
    
})

# unsafe cors settings (dev/testing only)
# CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000"]}})
# CORS(app, resources={r"/api/*": {"origins": "*"}, r"/static/*": {"origins": "*"}})
# CORS(app, supports_credentials=True, origins='*')
# CORS(app, supports_credentials=True)  




