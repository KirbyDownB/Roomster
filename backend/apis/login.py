from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from .models import User
import jwt

api = Namespace('login', description='Login related operations')

user_login_data = api.model('user_login_data', {
    'email': fields.String(description="User email or username"),
    'password': fields.String(description="User password")
})




@api.route('/')
class Login(Resource):
    def get(self):
        return {'hello': 'world'}

    @api.expect(user_login_data)
    def post(self):
        data = api.payload
        identifier = data.get('email')

        password = data.get('password')


        if identifier.find('@') > -1:        
            user_data = User.query.filter_by(email=identifier).first()
        else:
            return {"Message":"This is not a valid email"}


        
        if not user_data:
            return {"Message":"This user does not exist"}

        if user_data.check_password(password):
            token = jwt.encode({'email':user_data.email}, "SECRET_KEY")
            token = token.decode('utf-8')


            user_profile_data = user_data.__dict__
            del user_profile_data['_sa_instance_state']

            return {"Message":"Login Successful", "token":token, "user":user_profile_data}

        else:
            return {"Message":"Incorrect Password"}

