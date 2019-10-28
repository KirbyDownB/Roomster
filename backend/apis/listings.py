from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from flask_mail import Message
from .models import User
from . import site,endpoint_name, mail
import jwt


api = Namespace('listings', description='Listings related operations')

listings_data = api.model('listings_data', {
    'age': fields.String(description="Age of desired roommates"),
    'location_of_interest': fields.String(description="Location of desired area"),
    'ethnicity': fields.String(description="Ethnicity of desired roommates"),
    'number_of_roomates': fields.String(description="Amount of desired roommates"),
    'duration' : fields.String(description="Duration")
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
        location_of_interest = data.get('location_of_interest')
        ethnicity = data.get('ethnicity')
        number_of_roomates = data.get('number_of_roomates')
        duration = data.get('Duration')
        #price_range_max = data.get('price_range_max')       
        #price_range_min = data.get('price_range_min')

 #*********************************1 ENTRY QUERIES***********************************************************************     


        if age and not location_of_interest and not ethnicity and not number_of_roomates and not duration: #A
            user_data = User.query.filter_by(age=age).all()
            # for users in user_data:
            #     print(user_data)
            # print('HOLAAAAAA1!')

        if location_of_interest and not age and not ethnicity and not number_of_roomates and not duration: #L
            user_data = User.query.filter_by(location_of_interest=location_of_interest).all()
            # for users in user_data:
            #     print(user_data)
            # print('HOLAAAAAA2!')

        if ethnicity and not location_of_interest and not age and not number_of_roomates and not duration: #E
            user_data = User.query.filter_by(ethnicity=ethnicity).all()
            # for users in user_data:
            #     print(user_data)
            # print('HOLAAAAAA3!')


        if number_of_roomates and not location_of_interest and not ethnicity and not age and not duration: ##
            user_data = User.query.filter_by(number_of_roomates=number_of_roomates).all()
            # for users in user_data:
            #     print(user_data)
            # print('HOLAAAAAA4!')

        if number_of_roomates and not location_of_interest and not ethnicity and not age and not duration: ##
            user_data = User.query.filter_by(number_of_roomates=number_of_roomates).all()
            # for users in user_data:
            #     print(user_data)
            # print('HOLAAAAAA5!') 

        if duration and not number_of_roomates and not location_of_interest and not ethnicity and not age: ##
            user_data = User.query.filter_by(duration=duration).all()
            # for users in user_data:
            #     print(user_data)
            # print('HOLAAAAAA5!')       

 # NEED TO PROVE THAT THE QUERIES BELOW ARE CORRECT ***********************************************************************
 #*********************************2 ENTIRES QUERIES***********************************************************************     

        if location_of_interest and age and not ethnicity and not number_of_roomates: #AL
            user_data = User.query.filter_by(location_of_interest=location_of_interest, age=age).all()
            # for users in user_data:
            #     print(user_data)
            # print('HOLAAAAAA5!')       

        if ethnicity and age and not location_of_interest and not number_of_roomates: #AE
            user_data = User.query.filter(age==age, ethnicity==ethnicity).all()
            # for users in user_data:
            #     print(user_data)
            # print('HOLAAAAAA6!')   

        if ethnicity and number_of_roomates and not location_of_interest and not age: #A#
            user_data = User.query.filter(number_of_roomates==number_of_roomates, ethnicity==ethnicity).all()
            # for users in user_data:
            #     print(user_data)
            # print('HOLAAAAAA7!')

        if ethnicity and location_of_interest and not age and not number_of_roomates: #LE
            user_data = User.query.filter(location_of_interest==location_of_interest, ethnicity==ethnicity).all()
            # for users in user_data:
            #     print(user_data)
            # print('HOLAAAAAA8!')

        if location_of_interest and number_of_roomates and not age and not ethnicity: #L#
            user_data = User.query.filter(location_of_interest==location_of_interest, number_of_roomates==number_of_roomates).all()
            # for users in user_data:
            #     print(user_data)
            # print('HOLAAAAAA9!')

        if ethnicity and number_of_roomates and not age and not location_of_interest: #E#
            user_data = User.query.filter(ethnicity==ethnicity, number_of_roomates==number_of_roomates).all()
            # for users in user_data:
            #     print(user_data)
            # print('HOLAAAAAA10!')

 #*********************************3 ENTIRES QUERIES***********************************************************************     

        if age and location_of_interest and ethnicity and not number_of_roomates: #ALE
            user_data = User.query.filter(ethnicity==ethnicity, location_of_interest==location_of_interest, age==age).all()
            # for users in user_data:
            #     print(user_data)
            # print('HOLAAAAAA11!')


        if age and location_of_interest and number_of_roomates and not ethnicity: #AL#
            user_data = User.query.filter(number_of_roomates==number_of_roomates, location_of_interest==location_of_interest, age==age).all()
            # for users in user_data:
            #     print(user_data)
            # print('HOLAAAAAA12!')

        if age and ethnicity and number_of_roomates and not location_of_interest: #AE#
            user_data = User.query.filter(number_of_roomates==number_of_roomates, ethnicity==ethnicity, age==age).all()
            # for users in user_data:
            #     print(user_data)
            # print('HOLAAAAAA13!')

        if location_of_interest and ethnicity and number_of_roomates and not age: #LE#
            user_data = User.query.filter(number_of_roomates==number_of_roomates, ethnicity==ethnicity, location_of_interest==location_of_interest).all()
            # for users in user_data:
            #     print(user_data)
            # print('HOLAAAAAA14!')

 #*********************************4 ENTIRES QUERIES***********************************************************************

        if location_of_interest and ethnicity and number_of_roomates and age: #LE#
            user_data = User.query.filter(number_of_roomates==number_of_roomates, ethnicity==ethnicity, location_of_interest==location_of_interest, age==age).all()
            # for users in user_data:
            #     print(user_data)
            # print('HOLAAAAAA15!')

        return {'Message': 'cool'}