#standard library imports 
from cgitb import text
from email.mime import base
import re
from sqlalchemy import null
##remote library imports
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

##local imports
from config import db



class Material_Data(db.Model, SerializerMixin):
    
    __tablename__= "material_data"
    serialize_rules = ('-materials_generated.material_data',)
    
    #properties
    id = db.Column(db.Integer, primary_key=True)
    workflow = db.Column(db.String, nullable = False)
    maps =  db.Column(db.String)
    software = db.Column(db.String)
    color = db.Column(db.String, nullable = False)
    element = db.Column(db.String, nullable = False)
    condition = db.Column(db.String, nullable = False)
    manifestation = db.Column(db.String, nullable = False)
    
    
    #relationships/foreign keys/association proxies
    materials_generated = db.relationship('Material_Generated', backpopulates='material_data')
    prompt = association_proxy('materials_generated', 'base_color_prompt')
    base_color_url = association_proxy('materials_generated', 'base_color_url')

    def __repr__(self):
        return f'<Material_Data {self.id} / workflow: {self.material_workflow} / properties: {self.color} {self.element} {self.condition} {self.manifestation} / url: {self.base_color_url}>'

class Material_Generated(db.Model, SerializerMixin):

    __tablename__= "material_generated"
    serialize_rules = ('-material_data.materials_generated',)
    
    #properties
    id = db.Column(db.Integer, primary_key=True)
    base_color_prompt = db.Column(db.String, nullable = False)
    base_color_url = db.Column(db.String, nullable = False)
    
    #relationships/foreign keys/association proxies
    material_data_id = db.Column(db.Integer, db.ForeignKey('material_data.id'))
    material_data = db.relationship('Material_Data', back_populates='materials_generated', cascade = 'all, delete-orphan')
    
    def __repr__(self):
        return f'<Material_Generated {self.id} {self.base_color_prompt} {self.base_color_url}>'