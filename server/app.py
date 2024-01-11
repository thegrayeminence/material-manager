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





## error handlers: catch errors thrown from @validates and other exceptions
@app.errorhandler(Exception)
def handle_errors(e):
    return {'error': f'Exception:{str(e)}'}, 404

@app.errorhandler(ValueError)
def handle_errors(e):
    return {"error": f"Value Error:{str(e)}"}, 422
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)