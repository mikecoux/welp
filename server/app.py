#!/usr/bin/env python3

import os, math
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'instance/app.db')}")

from flask import Flask, jsonify, request
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, Business

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

@app.route('/')
def home():
    return "Yelp Open Dataset API. Available routes: • EDIT THIS"

# class Users(Resource):
#     pass

# class Reviews(Resource):
#     pass
def calculate_distance(lat, lng, user_lat, user_lng):
     print(lat, lng)
     return abs(math.hypot((user_lat - lat), (user_lng - lng)))

class BusinessSearch(Resource):
    def get(self, user_lat, user_lng):
        # try:
            # get lat and lng from params and convert back to float
            user_lat = float(user_lat)
            user_lng = float(user_lng)
            sq_distance = 0.25 # every degree is 54.6 miles; 0.25 (0.5 squared) is approximately a 27 mile radius (future goal: get all filter arguments from parameters)
            # if sorting by highest rated (future goal: create multiple sort options)
            def calculate_distance(lat, lng):
                return (lat - user_lat) * (lat - user_lat) + (lng - user_lng) * (lng - user_lng)

            query = Business.query.filter(calculate_distance(Business.latitude, Business.longitude) < sq_distance).order_by(-Business.stars).limit(10).all()
            businesses = [business.to_dict() for business in query]
            return businesses, 200
        # except:
        #     return {'error': 'failed to get results'}, 400

class BusinessesById(Resource):
    pass


# class Tips(Resource):
#     pass
# class Checkins(Resource):
#     pass
# class Photos (Resource):
#     pass

# api.add_resource(Users, '/users')
# api.add_resource(Reviews, '/reviews')
api.add_resource(BusinessSearch, '/businesssearch/<string:user_lat>/<string:user_lng>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
