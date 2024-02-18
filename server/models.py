#standard library imports 
from cgitb import text
from email.mime import base
import re
from sqlalchemy import null, MetaData
from flask_sqlalchemy import SQLAlchemy
##remote library imports
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.dialects.postgresql import JSON  






# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)

class Material(db.Model, SerializerMixin):
    __tablename__= "material"
    
    id = db.Column(db.Integer, primary_key=True)
    workflow = db.Column(db.String, nullable=False)
    maps = db.Column(JSON)  # Storing as JSON
    software = db.Column(JSON)  # Storing as JSON
    color = db.Column(db.String, nullable=False)
    element = db.Column(db.String, nullable=False)
    condition = db.Column(db.String, nullable=False)
    manifestation = db.Column(db.String, nullable=False)
    prompt = db.Column(db.String, nullable=False)
    ##imgs
    base_color_url = db.Column(db.String)  
    normal_map_url = db.Column(db.String) 
    height_map_url = db.Column(db.String) 
    smoothness_map_url = db.Column(db.String)  
    

    def __repr__(self):
        return f'<Material {self.id}>'
