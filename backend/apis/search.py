from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from flask_mail import Message
from .models import User, Posting
from . import db, mail
from .models import User
import jwt
import json
api = Namespace('search', description='Search related operations')


name_data = api.model('name_data', {"name": fields.String(description="name data")})

content_and_tags_data = api.model('content_and_tags_data', {"content_and_tags_data": fields.String(description="content and tags data")})
search_data = api.model('search', {
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

    @api.expect(search_data)
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


@api.route('/name/')
class Search(Resource):

    @api.expect(name_data)
    def post(self):
        data = api.payload

        name_data = data.get('name_data')
        if name_data is None:
            return {"Message":"Post body was empty"}, 400

        fname_hits = json.loads(User.objects(first_name__icontains=name_data).to_json())
        lname_hits = json.loads(User.objects(last_name__icontains=name_data).to_json())

        print(fname_hits)
        print(lname_hits)
        name_hits = fname_hits + lname_hits
        print(type(name_hits))
        name_hits = list({v['_id']['$oid']:v for v in name_hits}.values())
        # name_hits = list(set(name_hits))
        

        return {"Message":"Got {} search results".format(len(name_hits)), "results":name_hits}



@api.route('/content_and_tags/')
class Search(Resource):

    @api.expect(content_and_tags_data)
    def post(self):

        data = api.payload
        content_and_tags_data = data.get('content_and_tags_data')

        if content_and_tags_data is None:
            return {"Message":"Post body is empty"}, 400

        content_hits = json.loads(Posting.objects(content__icontains=content_and_tags_data).to_json())
        tag_hits = json.loads(Posting.objects(tags__all=[content_and_tags_data]).to_json())

        content_and_tags_hits = content_hits + tag_hits
        content_and_tags_hits = list({v['_id']['$oid']:v for v in content_and_tags_hits}.values())

        return {"Message":"Got {} search results".format(len(content_and_tags_hits)), "results":content_and_tags_hits} 

