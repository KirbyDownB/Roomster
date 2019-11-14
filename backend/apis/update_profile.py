from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from . import db
from sqlalchemy import exc
from .models import User
import jwt
from werkzeug.security import generate_password_hash, check_password_hash

api = Namespace('update_profile', description='Profile update related operations')
parser = api.parser()
parser.add_argument('Authorization',type=str,location='headers',help='Bearer Access Token', required=True)

update_profile_data = api.model('update_profile_data', {
    'email': fields.String(description="Email"),
    'password': fields.String(description="Password"),
    'firstName': fields.String(description="First name"),
    'lastName': fields.String(description="Last name"),
    'phoneNumber': fields.String(description="Phone number"),
    'dob': fields.String(description="Date of birth"),
    'address': fields.String(description="Address"),
    'age': fields.String(description="Age of desired roommates"),
    'location': fields.String(description="Location desired"),
    'ethnicity': fields.String(description="Ethnicity"),
    'numRoommates': fields.String(description="Desired amount of roommates"),
    'priceLow': fields.String(description="Minimum amount of money to be paid"),
    'priceHigh': fields.String(description="Maximum amount of money to be paid"),
})

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


        user_data = User.query.filter_by(email=decToken['email']).first()
        
        if user_data is not None:
            user_profile_data = user_data.__dict__
            print(user_profile_data)
            del user_profile_data['_sa_instance_state']
            del user_profile_data['password_hash']
            # token = token.decode('utf-8')
            return {"Message":"Data retrieval successful", "user": user_profile_data , "token":token}

        return {"Message":"You sent a GET request"}

    @api.doc('Reset a given users profile',parser=parser,body=update_profile_data)
    def post(self):
        
        data = api.payload
        print(data)


        email=data.get('email')
        password=data.get('password')
        first_name=data.get('firstName')
        last_name=data.get('lastName')
        phone_number=data.get('phoneNumber')
        date_of_birth=data.get('dob')
        address=data.get('address')
        age=data.get('age')
        location_of_interest=data.get('location')
        ethnicity=data.get('ethnicity')
        number_of_roommates=data.get('numRoommates')
        price_range_min=data.get('priceLow')
        price_range_max=data.get('priceHigh')


        args = parser.parse_args()
        token = args['Authorization']

        if not token:
            return {"Message":"Token is missing"}
        try:
            decToken = jwt.decode(token,"SECRET_KEY")
        except:
            return {"Message":"Failed to decode token"}



        user_email = decToken['email']

        user_data = User.object(email=user_email)


        # user_data = User.query.filter_by(email=user_email).first()

        # if password is not "":
                
        #     try:
        #         user_data.set_password(data.get('password'))
        #         db.session.add(user_data)
        #         db.session.commit()

        #     except exc.SQLAlchemyError as e:
        #         print(e)
        #         return {"Message":"Something went wrong when updating your profile"}


        try:

            if email is not "":

                u = User.object(email=email)
                if len(u) == 0:
                    user_data.update(email=email)
                else:
                    {"Message":"Unfortunately, that email is already taken. Please use a different one"}


            if first_name is not "":
                user_data.update(first_name=first_name)

            if last_name is not "":
                user_data.update(last_name=last_name)

            if phone_number is not "":
                user_data.update(phone_number=phone_number)

            if address is not "":
                user_data.update(address=address)

            if age is not "":
                user_data.update(age=age)

            if location_of_interest is not "":
                user_data.update(location_of_interest=location_of_interest)
            
            if ethnicity is not "":
                user_data.update(ethnicity=ethnicity)

            if number_of_roommates is not "":
                user_data.update(number_of_roommates=number_of_roommates)

            if price_range_min is not "":
                user_data.update(price_range_min=price_range_min)

            if price_range_max is not "":
                user_data.update(price_range_max=price_range_max)

        except:
            return {"Message":"Something went wrong when updating your profile. Please try again."}

        return {"Message":"Profile updated successfully"}

