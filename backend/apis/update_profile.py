from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from .models import User
import jwt

api = Namespace('update_profile', description='Profile update related operations')

update_profile_data = api.model('update_profile_data', {
    'email': fields.String(description="Email"),
    'password_hash': fields.String(description="Password"),
    'first_name': fields.String(description="First name"),
    'last_name': fields.String(description="Last name"),
    'phone_number': fields.String(description="Phone number"),
    'date_of_birth': fields.String(description="Date of birth"),
    'address': fields.String(description="Address"),
    'age': fields.String(description="Age of desired roommates"),
    'location_of_interest': fields.String(description="Location desired"),
    'ethnicity': fields.String(description="Ethnicity"),
    'number_of_roommates': fields.String(description="Desired amount of roommates"),
    'price_range_min': fields.String(description="Minimum amount of money to be paid"),
    'price_range_max': fields.String(description="Maximum amount of money to be paid"),
})

@api.route('/')
class update_profile(Resource):
    def get(self):
        return {"Message":"You sent a GET request"}

    @api.expect(update_profile_data)
    def post(self):
        
        data = api.payload
        #get token data
        # token_email 
        # user_data = User.query.get(email=token_email)


        # in if
            # if email is not ""
                # user_data.email = new_email
        user_data = User(email=data.get('email'),\
            first_name=data.get('first_name'),\
            last_name=data.get('last_name'),\
            phone_number=data.get('phone_number'),\
            date_of_birth=data.get('date_of_birth'),\
            address=data.get('address'),\
            age=data.get('age'),\
            location_of_interest=data.get('location_of_interest'),\
            ethnicity=data.get('ethnicity'),\
            number_of_roommates=data.get('number_of_roommates'),\
            price_range_min=data.get('price_range_min'),\
            price_range_max=data.get('price_range_max'))
                
        try:
            user_data.set_password(data.get('password'))
            db.session.add(user_data)
            db.session.commit()

        except exc.SQLAlchemyError as e:
            print(e)
            return {"Message":"Something went wrong when updating your profile"}

        if email is not "":
            user_data.email = new_email

        if first_name is not "":
            user_data.first_name = new_first_name

        if last_name is not "":
            user_data.last_name =  new_last_name

        if phone_number is not "":
            user_data.phone_number = new_phone_number

        if date_of_birth is not "":
            user_data.date_of_birth = new_date_of_birth

        if address is not "":
            user_data.address = new_address

        if age is not "":
            user_data.age = new_age

        if location_of_interest is not "":
            user_data.location_of_interest = new_location_of_interest
        
        if ethnicity is not "":
            user_data.ethnicity = new_ethnicity

        if number_of_roommates is not "":
            user_data.number_of_roommates = new_number_of_roommates

        if price_range_min is not "":
            user_data.price_range_min = new_price_range_min

        if price_range_max is not "":
            user_data.price_range_max = new_price_range_max

