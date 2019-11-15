from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from . import db
from sqlalchemy import exc
from .models import User
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
import json

api = Namespace('retrieve_profile', description='Profile retrieval related operations')
parser = api.parser()
parser.add_argument('Authorization',type=str,location='headers',help='Bearer Access Token', required=True)



@api.route('/')
class update_profile(Resource):
    @api.doc(parser=parser)
    def get(self):
        # decode the token
        args = parser.parse_args()

        token = args['Authorization']

        if not token:
            return {"Message":"Token is missing"}
        try:
            decToken = jwt.decode(token,"SECRET_KEY")
        except:
            return {"Message":"Failed to decode token"}

        user_email = decToken.get('email')
        if user_email is None:
            return {"Message":"Token machine BROKE"}

        user_data = User.objects(email=user_email)
        
        if len(user_data) == 1:
            user_profile_data = json.loads(user_data[0].to_json())
            del user_profile_data['password_hash']
            # token = token.decode('utf-8')
            return {"Message":"Data retrieval successful", "user": user_profile_data , "token":token}

        return {"Message":"You sent a GET request"}