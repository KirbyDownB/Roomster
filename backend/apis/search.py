from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from flask_mail import Message
from .models import User
from . import db, mail
from .models import User
import jwt
import json
api = Namespace('search', description='Search related operations')

filter_data = api.model('Filters', {
    'first_name': fields.String(description="First Name", default=""),
    'last_name':fields.String(description="Last Name", default=""),
    'address': fields.String(description="Address", default=""),
    'phone_number':fields.String(description="Phone Number", default=""),
    'age': fields.String(description="Age", default=""),
    'range': fields.String(description="Range", default=""),
    'location_of_interest': fields.String(description="Location", default=""),
    'ethnicity' : fields.String(description='Ethnicity', default=""),
    'range_max' : fields.String(description='Range Max', default=""),
    'range_min':fields.String(description='Range Min', default=""),
    'num_roommates': fields.String(description='Number of Roommates', default=""),
    'duration' : fields.String(description='Duration', default="")
})




@api.route('/')
class Search(Resource):
    def get(self):
        return {"Message":"You sent a GET request"}

    @api.expect(filter_data)
    def post(self):
    
        data = api.payload

        if isinstance(data,dict):


            keys_to_query = {}
            for key in data:
                print(key)
                if data.get(key) != "" and data.get(key) != "string":
                    print("Found one")
                    keys_to_query[key] = data[key]

            print(data)
            print(keys_to_query)



            
            results = User.objects(__raw__=keys_to_query)
            
            results = results.to_json()
            print(results)
            results = json.loads(results)
            # need to determine how the object comes back
            # if its a pymongo cursor object, just cast it to a list. 
            # likely the object is likely json serializable

            return {"Message":"Query successful", "results":results}


        else:
            return {"Message":"Something is seriously wrong. The data was not parsed correctly"}


        return {"Data": 0}
        