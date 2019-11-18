from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from flask_mail import Message
from .models import User, Posting
from . import db, mail
from .models import User
from mongoengine.queryset.visitor import Q
import jwt
import json
from datetime import datetime
api = Namespace('filter', description='Filter related operations')


filter_data = api.model('filter_data', {
    'gender': fields.String(description="Gender", default=""),
    'location': fields.String(description="Location", default=""),
    'ethnicity' : fields.String(description='Ethnicity', default=""),
    'duration' : fields.String(description='Duration', default=""),
    'priceMin': fields.String(description="The minimum price", default=""),
    'priceMax': fields.String(description="The maximum price", default="")
})

def printData(user_data):
    for user in user_data:
        print(user.first_name)



@api.route('/')
class Filter(Resource):

    @api.expect(filter_data)
    def post(self):
        
        data = api.payload
        # print(data)

        gender = data.get('gender')
        location = data.get('location')
        ethnicity = data.get('ethnicity')
        duration = data.get('duration')
        priceMin = data.get('priceMin')
        priceMax = data.get('priceMax')

        print(gender)
        print(location)
        print(ethnicity)
        print(duration)
        print(priceMin)
        print(priceMax)
        

        if gender == "Select a gender":
            gender = ""
        if location == "Select a location":
            location = ""
        if ethnicity == "Select an ethnicity":
            ethnicity = ""
        if duration == "Select a duration":
            duration = ""


        if int(priceMin) == 0 and int(priceMax) == 123124:
            priceMin = ""
            priceMax = ""

        print(gender)
        print(location)
        print(ethnicity)
        print(duration)
        print(priceMin)
        print(priceMax)


        print(not(location))
        print(not(gender))
    
        print(not(ethnicity))
        print(not(duration))
    

        # for user in User.objects:
        #     print(user.location_of_interest)
        if not gender and not location and not ethnicity and not duration and not priceMin and not priceMax: #nothing
            user_data = User.objects

        elif gender and not location and not ethnicity and not duration and not priceMin and not priceMax: #gender
            user_data = User.objects(gender=gender)
            printData(user_data)

        elif location and not gender and not ethnicity and not duration and not priceMin and not priceMax: #location
            user_data = User.objects(location_of_interest=location)
            printData(user_data)

        elif ethnicity and not gender and not location and not duration and not priceMin and not priceMax: #ethnicity
            user_data = User.objects(ethnicity=ethnicity)
            printData(user_data)

        elif duration and not gender and not location and not ethnicity and not priceMin and not priceMax: #duration
            user_data = User.objects(duration=duration)
            printData(user_data)

        elif gender and location and not ethnicity and not duration and not priceMin and not priceMax: #gender-location
            user_data = User.objects(Q(gender=gender) & Q(location_of_interest=location))
            printData(user_data)

        elif gender and ethnicity and not location and not duration and not priceMin and not priceMax: #gender-ethnicity
            user_data = User.objects(Q(gender=gender) & Q(ethnicity=ethnicity))
            printData(user_data)

        elif gender and duration and not ethnicity and not location and not priceMin and not priceMax: #gender-duration
            user_data = User.objects(Q(gender=gender) & Q(duration=duration))
            printData(user_data)

        elif location and ethnicity and not duration and not gender and not priceMin and not priceMax: #location-ethnicity
            user_data = User.objects(Q(location_of_interest=location) & Q(ethnicity=ethnicity))
            printData(user_data)

        elif location and duration and not ethnicity and not gender and not priceMin and not priceMax: #location-duration
            user_data = User.objects(Q(location_of_interest=location) & Q(duration=duration))
            printData(user_data)

        elif ethnicity and duration and not location and not gender and not priceMin and not priceMax: #ethnicity-duration
            user_data = User.objects(Q(ethnicity=ethnicity) & Q(duration=duration))
            printData(user_data)

        elif gender and location and ethnicity and not duration and not priceMin and not priceMax: #gender-location-ethnicity
            user_data = User.objects(Q(location_of_interest=location) & Q(gender=gender) & Q(ethnicity=ethnicity))
            printData(user_data)

        elif gender and location and duration and not ethnicity and not priceMin and not priceMax: #gender-location-duration
            user_data = User.objects(Q(location_of_interest=location) & Q(gender=gender) & Q(duration=duration))
            printData(user_data)

        elif gender and ethnicity and duration and not location and not priceMin and not priceMax: #gender-ethnicity-duration
            user_data = User.objects(Q(duration=duration) & Q(gender=gender) & Q(ethnicity=ethnicity))
            printData(user_data)

        elif location and ethnicity and duration and not gender and not priceMin and not priceMax: #location-ethnicity-duration
            user_data = User.objects(Q(location_of_interest=location) & Q(duration=duration) & Q(ethnicity=ethnicity))
            printData(user_data)

        elif location and ethnicity and duration and gender and not priceMin and not priceMax: #location-ethnicity-duration-gender
            user_data = User.objects(Q(location_of_interest=location) & Q(gender=gender) & Q(ethnicity=ethnicity) & Q(duration=duration))
            printData(user_data)

        elif location and ethnicity and duration and gender and priceMin and priceMax: #location-ethnicity-duration-gender and price min and max
            user_data = User.objects(Q(location_of_interest=location) & Q(gender=gender) & Q(ethnicity=ethnicity) & Q(duration=duration)) & Q(price_range_min__gte=(priceMin)) & Q(price_range_max__lte=(priceMax))
            printData(user_data)


        elif location and not ethnicity and duration and gender and priceMin and priceMax: #location-ethnicity-duration-gender and price min and max
            user_data = User.objects(Q(location_of_interest=location) & Q(gender=gender) & Q(duration=duration)) & Q(price_range_min__gte=(priceMin)) & Q(price_range_max__lte=(priceMax))
            printData(user_data)


        elif location and not ethnicity and not duration and gender and priceMin and priceMax: #location-ethnicity-duration-gender and price min and max
            user_data = User.objects(Q(location_of_interest=location) & Q(gender=gender) & Q(price_range_min__gte=(priceMin)) & Q(price_range_max__lte=(priceMax)))
            printData(user_data)

        elif location and not ethnicity and not duration and not gender and priceMin and priceMax: #location-ethnicity-duration-gender and price min and max
            user_data = User.objects(Q(location_of_interest=location) & Q(price_range_min__gte=(priceMin)) & Q(price_range_max__lte=(priceMax)))
            printData(user_data)

        elif not location and not ethnicity and not duration and not gender and int(priceMin) >=0 and int(priceMax) >=0: #location-ethnicity-duration-gender and price min and max
            print("HIIII")
            print(priceMin)
            print(priceMax)

            user_data = User.objects(Q(price_range_min__gte=(priceMin)) & Q(price_range_max__lte=(priceMax)))
            print(user_data)
            user_data = User.objects(Q(price_range_min__gte=(priceMin)) & Q(price_range_max__lte=(priceMax)))
            printData(user_data)

        
        postings = []
        for user in user_data:
            p = json.loads(Posting.objects(poster_email=user.email).to_json())
            postings += p

        if len(postings) > 0:
            postings = list({v['_id']['$oid']:v for v in postings}.values())
            for p in postings:
                d = (str(p['date']['$date'])[:-3])
                d = int(d)
                p['date'] = (datetime.utcfromtimestamp(d).strftime('%Y-%m-%d %H:%M:%S'))
                p['posting_id'] = p['_id']['$oid']

        # make sure the list is unique

        return {"Message":"MEME", "postings":postings }
