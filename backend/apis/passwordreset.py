from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from .models import User
import jwt

api = Namespace('passwordreset', description='Password Reset operations related operations')

password_reset_data = api.model('password_reset_data', {
    'new_password': fields.String(description="New password")
})

parser = api.parser()
parser.add_argument('Authorization',type=str,location='headers',help='Bearer Access Token', required=True)

link = "http://localhost:3000/"
endpoint_name = "resetPassword/"


@api.route('/password')
class PasswordReset(Resource):
    def get(self):
        return {"Message":"You sent a GET request"}

    @api.doc('Access Token and reset password',parser=parser,body=password_reset_data)
    def post(self):
        
        data = api.payload
        password = data.get('new_password')
        user_data = None
        args = parser.parse_args()
        token = args['Authorization']

        if not token:
            return {"Message":"Token is missing"}
        try:
            decToken = jwt.decode(token,"SECRET_KEY")
        except:
            return {"Message":"Failed to decode token"}


        user_email = decToken['email']
        if user_email.find('@') > -1:
            user_data = User.query.filter_by(email=user_email).first()

        if not user_data or user_data is None:
            return {"Message":"This user does not exist"}


        user_data.set_password(password)

        return {"Message":"Password Reset"}

# @api.route('/email')
# class SendResetEmail(Resource)


        


        


