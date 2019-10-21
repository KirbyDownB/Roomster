from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from .models import User
import jwt

api = Namespace('passwordreset', description='Password Reset operations related operations')

password_reset_data = api.model('password_reset_data', {
    'identifier': fields.String(description="User email or username"),
})


@api.route('/')
class PasswordReset(Resource):
    def get(self):
        return {"Message":"You sent a GET request"}

    @api.expect(password_reset_data)
    def post(self):

        data = api.payload
        identifier = data.get('identifier')
        user_data = None

        if identifier.find('@') > -1:
            user_data = User.query.filter_by(email=identifier).first()
        
        else:
            user_data = User.query.filter_by(username=identifier).first()

        if not user_data or user_data is None:
            return {"Message":"This user does not exist"}

        return {"Message":"User was found!"}


        


        


