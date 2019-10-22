from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from flask_mail import Message
from .models import User
from . import site,endpoint_name, mail
import jwt


api = Namespace('passwordreset', description='Password Reset operations related operations')

password_reset_data = api.model('password_reset_data', {
    'new_password': fields.String(description="New password")
})
reset_email_data = api.model('reset_email_data', {
    'email': fields.String(description="Email address to send reset password email to")
})

parser = api.parser()
parser.add_argument('Authorization',type=str,location='headers',help='Bearer Access Token', required=True)


@api.route('/password')
class PasswordReset(Resource):
    def get(self):
        return {"Message":"You sent a GET request"}

    @api.doc('Access Token and reset password',parser=parser,body=password_reset_data)
    def post(self):
        
        data = api.payload
        password = data.get('new_password')
        if password is None:
            return {"Message":"New password is missing"}
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
            return {"Message":"This user does not exist or an invalid email was sent"}


        user_data.set_password(password)

        return {"Message":"Password Reset"}

@api.route('/email')
class SendResetEmail(Resource):

    @api.expect(reset_email_data)
    def post(self):

        data = api.payload
        email = data.get('email')
        if email is None:
            return {"Message":"Email is missing"}

        user_data = None

        if email.find('@') > -1:
            user_data = User.query.filter_by(email=email).first()

        if not user_data or user_data is None:
            return {"Message":"No user with this email found"}

        token = jwt.encode({'username': user_data.username, "email":user_data.email}, "SECRET_KEY")
        link = site + endpoint_name + token.decode('utf-8')

        subject = "[Roomster] Password Reset"
        body = "We recieved a request to reset your password. \n If that was you, click the link here: \n " + link + "\n\n Sincerely, \n The Roomster Team"
        recipients = [email]

        msg = Message(subject=subject, sender="roomsterhelp@gmail.com", body=body, recipients=recipients)

        try:
            mail.send_message(msg)
        except:
            return {"Message":"Something went wrong when sending the email"}


        return {"Message":"Email successfully sent"}






        


        


