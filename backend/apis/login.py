from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from .models import User
import jwt

api = Namespace('login', description='Login related operations')

user_login_data = api.model('user_login_data', {
    'identifier': fields.String(description="User email or username"),
    'password': fields.String(description="User password")
})




@api.route('/')
class Login(Resource):
    def get(self):
        return {'hello': 'world'}

    @api.expect(user_login_data)
    def post(self):
        data = api.payload
        identifier = data.get('identifier')

        password = data.get('password')


        if identifier.find('@') > -1:
            user_data = User.query.filter_by(email=identifier).first()
        
        else:
            user_data = User.query.filter_by(username=identifier).first()

        
        if not user_data:
            return {"Message":"This user does not exist"}

        if user_data.check_password_hash(password):
            token = jwt.encode({'username':user_data.username, 'email':user_data.email}, "SECRET_KEY")
            token.decode('utf-8')
            return {"Message":"Login Successful", "token":token}

        else:
            return {"Message":"Incorrect Password"}