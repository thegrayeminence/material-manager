#standard library imports 
import re
##remote library imports
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

##local imports
from config import db


class FileData(db.Model):
    
    __tablename__="FileData"
    
    id = db.Column(db.Integer, primary_key=True)
    #LOGIC FOR MODEL GOES HERE

class MaterialData(db.Model):
    
    __tablename__= "MaterialData"
    
    id = db.Column(db.Integer, primary_key=True)
    #LOGIC FOR MODEL GOES HERE

class TextureData(db.Model):
    
    __tablename__= "TextureData"
    
    id = db.Column(db.Integer, primary_key=True)
    #LOGIC FOR MODEL GOES HERE

####OTHER NECESSARY MODELS BELOW

    def __repr__(self):
        return f'<ImageMetadata {self.filename}>'