from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
import jwt

api = Namespace('login', description='Login related operations')

user_login_data = api.model('user_login_data', {
    'email': fields.String(description="User email"),
    'username': fields.String(description="User username"),
    'password': fields.String(description="User password")
})




@api.route('/')
class Login(Resource):
    def get(self):
        return {'hello': 'world'}

    @api.expect(user_login_data)
    def post(self):
        
        print(api.payload)
        return api.payload
