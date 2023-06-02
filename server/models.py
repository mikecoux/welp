#!/usr/bin/env python3

import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'instance/app.db')}")

from flask import Flask, make_response, jsonify, request, abort
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, User, Review, Business

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

@app.route('/')
def home():
    return 'Yelp OpenDataSet API. Available routes: EDIT THIS'

class Users(Resource):
    pass

class Reviews(Resource):
    pass

class Businesses(Resource):
    pass

api.add_resource(Users, '/users')
api.add_resource(Reviews, '/reviews')
api.add_resource(Businesses, '/businesses')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
