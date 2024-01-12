#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, request, session, jsonify 
from flask_restful import Resource


# Local imports
from models import db
from config import app, api

## url prefix for flask endpoints
URL_PREFIX = '/api'

## HELPER FUNCTIONS ## 
## get id of current user, if applicable



##serialization rules 

##endpoints
@app.post( URL_PREFIX + '/upload_filedata')
def upload_metadata():
    data = request.json

    metadata = ImageMetadata(
        filename=data['filename'],
        size=data['size'],
        filetype=data['filetype'],
        exif=data.get('exif')
    )

    db.session.add(metadata)
    db.session.commit()

    return jsonify({'message': 'Metadata saved successfully'}), 201

def upload_materialdata():
    data = request.json
    material = Material(**data)  # Ensure this matches your Material model's structure
    db.session.add(material)
    db.session.commit()

    return jsonify({'message': 'Material data saved successfully'}), 201




## error handlers: catch errors thrown from @validates and other exceptions
@app.errorhandler(Exception)
def handle_errors(e):
    return {'error': f'Exception:{str(e)}'}, 404

@app.errorhandler(ValueError)
def handle_errors(e):
    return {"error": f"Value Error:{str(e)}"}, 422
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)