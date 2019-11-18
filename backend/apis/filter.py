from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from flask_mail import Message
from .models import User, Posting
from . import db, mail
from .models import User
from mongoengine.queryset.visitor import Q
import jwt
import json
api = Namespace('filter', description='Filter related operations')


filter_data = api.model('filter_data', {
    'gender': fields.String(description="Gender", default=""),
    'location': fields.String(description="Location", default=""),
    'ethnicity' : fields.String(description='Ethnicity', default=""),
    'duration' : fields.String(description='Duration', default="")
})

def printData(user_data):
    for user in user_data:
        print(user.first_name)

def existsData(user_data):
    print(user_data)
    if len(user_data) == 0:
        return{"Message":"Sorry!, No matches with your filter"}


@api.route('/')
class Search(Resource):

    @api.expect(filter_data)
    def post(self):
        
        data = api.payload
        # print(data)

        gender = data.get('gender')
        location = data.get('location')
        ethnicity = data.get('ethnicity')
        duration = data.get('duration')

        # for user in User.objects:
        #     print(user.location_of_interest)

        if not gender and not location and not ethnicity and not duration: #nothing
            return {"Message":"Nothing was sent in the search body"}

        elif gender and not location and not ethnicity and not duration: #gender
            user_data = User.objects(gender=gender)
            printData(user_data)

        elif location and not gender and not ethnicity and not duration: #location
            user_data = User.objects(location_of_interest=location)
            # printData(user_data)
            existsData(user_data)
            printData(user_data)

        elif ethnicity and not gender and not location and not duration: #ethnicity
            user_data = User.objects(ethnicity=ethnicity)
            printData(user_data)

        elif duration and not gender and not location and not ethnicity: #duration
            user_data = User.objects(duration=duration)
            printData(user_data)

        elif gender and location and not ethnicity and not duration: #gender-location
            user_data = User.objects(Q(gender=gender) & Q(location_of_interest=location))
            printData(user_data)

        elif gender and ethnicity and not location and not duration: #gender-ethnicity
            user_data = User.objects(Q(gender=gender) & Q(ethnicity=ethnicity))
            printData(user_data)

        elif gender and duration and not ethnicity and not location: #gender-duration
            user_data = User.objects(Q(gender=gender) & Q(duration=duration))
            printData(user_data)

        elif location and ethnicity and not duration and not gender: #location-ethnicity
            user_data = User.objects(Q(location_of_interest=location) & Q(ethnicity=ethnicity))
            printData(user_data)

        elif location and duration and not ethnicity and not gender: #location-duration
            user_data = User.objects(Q(location_of_interest=location) & Q(duration=duration))
            printData(user_data)

        elif ethnicity and duration and not location and not gender: #ethnicity-duration
            user_data = User.objects(Q(ethnicity=ethnicity) & Q(duration=duration))
            printData(user_data)

        elif gender and location and ethnicity and not duration: #gender-location-ethnicity
            user_data = User.objects(Q(location_of_interest=location) & Q(gender=gender) & Q(ethnicity=ethnicity))
            printData(user_data)

        elif gender and location and duration and not ethnicity: #gender-location-duration
            user_data = User.objects(Q(location_of_interest=location) & Q(gender=gender) & Q(duration=duration))
            printData(user_data)

        elif gender and ethnicity and duration and not location: #gender-ethnicity-duration
            user_data = User.objects(Q(duration=duration) & Q(gender=gender) & Q(ethnicity=ethnicity))
            printData(user_data)

        elif location and ethnicity and duration and not gender: #location-ethnicity-duration
            user_data = User.objects(Q(location_of_interest=location) & Q(duration=duration) & Q(ethnicity=ethnicity))
            printData(user_data)

        elif location and ethnicity and duration and gender: #location-ethnicity-duration-gender
            user_data = User.objects(Q(location_of_interest=location) & Q(gender=gender) & Q(ethnicity=ethnicity) & Q(duration=duration))
            printData(user_data)
        

        return {"Hello":"World"}
