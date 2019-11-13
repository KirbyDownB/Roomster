from flask import Flask, request
from flask_restplus import Resource, Api, fields, Namespace
from flask_mail import Message
from .models import User
from . import db, mail, storage
from .models import User
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.datastructures import FileStorage


api = Namespace('signup', description='Signup related operations')



upload_parser = api.parser()
upload_parser.add_argument('file', location='files',
                           type=FileStorage, required=True)

upload_parser.add_argument('email', type=str, help='The User\'s email')
upload_parser.add_argument('password', type=str, help='The User\'s password')
upload_parser.add_argument('first_name', type=str, help='The User\'s first name')
upload_parser.add_argument('last_name', type=str, help='The User\'s last name')
upload_parser.add_argument('address', type=str, help='The User\'s address')
upload_parser.add_argument('phone_number', type=str, help='The User\'s phone number')
upload_parser.add_argument('range', type=str, help='The User\'s range')
upload_parser.add_argument('location_of_interest', type=str, help='The User\'s location of interest')
upload_parser.add_argument('ethnicity', type=str, help='The User\'s ethnicity')
upload_parser.add_argument('range_min', type=str, help='The User\'s min range')
upload_parser.add_argument('range_max', type=str, help='The User\'s max range')
upload_parser.add_argument('num_roommates', type=str, help='The User\'s preferred number of roommates')
upload_parser.add_argument('duration', type=str, help='The User\'s preferred duration for the lease')


@api.route('/')
class Signup(Resource):
    def get(self):
        return {"Message":"You sent a GET request"}

    @api.expect(upload_parser)
    def post(self):
    
        data = upload_parser.parse_args()
        print(data)
        #data = api.form 
        print(request.form)
        print(request.get_json())
        print(request.json)
        print(request.files)
        # print(api)
        
        uploaded_file = data['file']


        user_data = User(email=data.get('email'), first_name=data.get('first_name'),\
        last_name=data.get('last_name'), address=data.get('address'), phone_number=data.get('phone_number'), \
        age=data.get('age'), range=data.get('range'), ethnicity=data.get('ethnicity'), location_of_interest=data.get('location_of_interest')\
            ,price_range_min=data.get('range_min'), price_range_max=data.get('range_max'), number_of_roommates=data.get('number_of_roommmates'), duration=data.get('duration'))

        
            
        user_data.password_hash = generate_password_hash(data.get('password'))
           
        token = jwt.encode({'email':user_data.email}, "SECRET_KEY")
        token = token.decode('utf-8')

        storage.child(token).put(uploaded_file)
        user_data.pf_pic = storage.child(token).get_url(None)




        subject = "[Roomster] Thanks for signing up!"
        body = "Thank you for signing up for Roomster!" + "\n\n Sincerely, \n The Roomster Team"
        recipients = [user_data.email]

        msg = Message(subject=subject, sender="roomsterhelp@gmail.com", body=body, recipients=recipients)




        try:
            user_data.save()
        except Exception:
            return {"Message":"Something went wrong when signing up the user"}





        try:
            mail.send(msg)
        except:
            return {"Message":"Something went wrong when sending the email"}
        

        
        return {"Message":"Signup Successful", "token":token}

