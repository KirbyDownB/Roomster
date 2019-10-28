from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from flask_mail import Message
from .models import User
from . import db, mail
from .models import User
import jwt
from sqlalchemy import exc
api = Namespace('signup', description='Signup related operations')

user = api.model('User', {
    'email': fields.String(description="User email"),
    'password': fields.String(description="User password"),
    'first_name': fields.String(description="Address"),
    'last_name':fields.String(description="Phone Number"),
    'address': fields.String(description="Address"),
    'phone_number':fields.String(description="Phone Number"),
    'age': fields.String(description="Age"),
    'range': fields.String(description="Range"),
    'location_of_interest': fields.String(description="Location"),
    'ethnicity' : fields.String(description='Ethnicity'),
    'range_max' : fields.String(description='Range Max'),
    'range_min':fields.String(description='Range Min'),
    'num_roommates': fields.String(description='Number of Roommates'),
    'duration' : fields.String(description='Duration')
})




@api.route('/')
class Signup(Resource):
    def get(self):
        return {"Message":"You sent a GET request"}

    @api.expect(user)
    def post(self):
    
        data = api.payload
        user_data = User(email=data.get('email'), first_name=data.get('first_name'),\
        last_name=data.get('last_name'), address=data.get('address'), phone_number=data.get('phone_number'), \
        age=data.get('age'), range=data.get('range'), ethnicity=data.get('ethnicity'), location_of_interest=data.get('location_of_interest')\
            ,price_range_min=data.get('range_min'), price_range_max=data.get('range_max'), number_of_roommates=data.get('number_of_roommmates'), duration=data.get('duration'))

        try:
            user_data.set_password(data.get('password'))
            db.session.add(user_data)
            db.session.commit()

        
        except exc.SQLAlchemyError as e:
            print(e)
            return {"Message":"Something went wrong when signing up the user"}


        token = jwt.encode({'email':user_data.email}, "SECRET_KEY")
        token = token.decode('utf-8')


        subject = "[Roomster] Thanks for signing up!"
        body = "Thank you for signing up for Roomster!" + "\n\n Sincerely, \n The Roomster Team"
        recipients = [user_data.email]

        msg = Message(subject=subject, sender="roomsterhelp@gmail.com", body=body, recipients=recipients)

        try:
            mail.send(msg)
        except:
            return {"Message":"Something went wrong when sending the email"}

        return {"Message":"Signup Successful", "token":token}