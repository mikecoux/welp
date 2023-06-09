#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_cors import cross_origin

from config import app, db, api
from models import User, Business, Review


class Home(Resource):
    def get(self):
        return {'message': 'welcome'}, 200

class Signup(Resource):
    def post(self):
        request_json = request.get_json()
        username = request_json.get('email')
        password = request_json.get('password')

        user = User(
            username=username,
        )

        # the setter will encrypt this
        user.password_hash = password

        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            print(user.to_dict())
            print(session['user_id'])
            print(session['user_id'] == user.id)
            return user.to_dict(), 201
        
        except IntegrityError:
            return {'error': '422 Unprocessable Entity'}, 422

class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

class Login(Resource):
    def post(self):
        request_json = request.get_json()

        username = request_json.get('email')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None
            
            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401
    
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Home, '/', endpoint='home')

if __name__ == '__main__':
    app.run(port=5555, debug=True)