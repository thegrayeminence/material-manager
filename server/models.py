#standard library imports 
import re
##remote library imports
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

##local imports
from config import db, bcrypt


class ImageMetadata(db.Model):
    
    __tablename__="filedata"
    
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(100), nullable=False)
    size = db.Column(db.Integer, nullable=False)
    filetype = db.Column(db.String(50), nullable=False)
    exif = db.Column(db.JSON)

    def __repr__(self):
        return f'<ImageMetadata {self.filename}>'