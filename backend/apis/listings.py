from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from flask_mail import Message
from .models import User
from . import site,endpoint_name, mail
import jwt


api = Namespace('listings', description='Listings related operations')

listings_data = api.model('listings_data', {
    'age': fields.String(description="Age of desired roommates"),
    'location': fields.String(description="Location of desired area"),
    'ethnicity': fields.String(description="Ethnicity of desired roommates"),
    'number_of_roomates': fields.String(description="Amount of desired roommates"),
    #'price_range_max': fields.String(description="Desired maximum price range"),
    #'price_range_min': fields.String(description="Desired minimum price range"),
})


@api.route('/')
class Listings(Resource):
    def get(self):
        return {"Message":"You sent a GET request"}

    @api.expect(listings_data)
    def post(self):
        
        data = api.payload

        age = data.get('age')
        location = data.get('location')
        ethnicity = data.get('ethnicity')
        number_of_roomates = data.get('number_of_roomates')
        #price_range_max = data.get('price_range_max')       
        #price_range_min = data.get('price_range_min')

        if age and not location and not ethnicity and not number_of_roomates:
            user_data = User.query.filter_by(age=age).first()
        # if location and not age and not ethnicity and not number_of_roomates:
        #     user_data = User.query.filter_by(location=location).first()
        # if ethnicity and not location and not age and not number_of_roomates:
        #     user_data = User.query.filter_by(ethnicity=ethnicity).first()
        # if number_of_roomates and not location and not ethnicity and not age:
        #     user_data = User.query.filter_by(number_of_roomates=number_of_roomates).first()

        return {'Message': 'cool'}