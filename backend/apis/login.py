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
            u = User.query.filter_by(email=email).first()
        
        else:
            u = User.query.filter_by(username=username).first()

        
        if not u:
            return {"Error":"This user does not exist"}

        if u.check_password_hash(password):
            token = jwt.encode({'username':u.username, 'email':u.email}, "SECRET_KEY")
            token.decode('utf-8')
            return {"Message":"Login Successful", "token":token}

        else:
            return {"Error":"Incorrect Password"}