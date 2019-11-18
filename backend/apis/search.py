from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from flask_mail import Message
from .models import User, Posting
from . import db, mail
from .models import User
import jwt
import json
from datetime import datetime
api = Namespace('search', description='Search related operations')


name_data = api.model('name_data', {"name_data": fields.String(description="name data")})

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
parser = api.parser()
parser.add_argument('Authorization',type=str,location='headers',help='Bearer Access Token', required=True)
def tokenToEmail(args):

    token = args['Authorization']

    if not token:
        return None
    try:
        decToken = jwt.decode(token,"SECRET_KEY")
    except:
        return None

    return  decToken.get('email')

def emailExists(email,option):

    u = User.objects(email=email)

    if len(u) != 1: # does not exist
        return False, {}
    elif len(u) == 1 and option == 1:
        return True, u[0]
    elif len(u) ==1 and option == 2:
        return True, u
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
            return {"Message":"Something is seriously wrong. The data was not parsed correctly"}, 400


        return {"Message": "Something is seriously wrong"}, 400


@api.route('/name/')
class Search(Resource):

    @api.doc('Authorization and searching friends', parser=parser, body=name_data)
    def post(self):
        data = api.payload
        args = parser.parse_args()
        name_data = data.get('name_data')
        if name_data is None:
            return {"Message":"Post body was empty"}, 400

        user_email = tokenToEmail(args)
        if user_email is None:
            return {"Message":"Token machine BROKE"}, 400
        exists, user_obj = emailExists(user_email,2)
        if not exists:
            return {"Message":"That user does not exist"}, 400





        friends = user_obj.first().friends
        print(friends)
        friend_objs = User.objects(email__in=friends)
        print(friend_objs)
        # f = friend_objs(first_name__icontains=name_data)
        # l = friend_objs(last_name__icontains=name_data)
        # print(f)
        # print(l)

        # friends_list = []
        # for friend in friends:
        #     friends_list.append(User.objects(email=friend.email).first())




        fname_hits = json.loads(friend_objs(first_name__icontains=name_data).to_json())
        lname_hits = json.loads(friend_objs(last_name__icontains=name_data).to_json())

        print(fname_hits)
        print(lname_hits)
        name_hits = fname_hits + lname_hits
        print(type(name_hits))
        name_hits = list({v['_id']['$oid']:v for v in name_hits}.values())

        for name in name_hits:
            name['name'] = name['first_name'] + ' ' + name['last_name']
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

        content_and_tags_hits_M = []
        for p in content_and_tags_hits:
             d = (str(p['date']['$date'])[:-3])
             d = int(d)
             p['date'] = (datetime.utcfromtimestamp(d).strftime('%Y-%m-%d %H:%M:%S'))
             p['posting_id'] = p['_id']['$oid']
             content_and_tags_hits_M.append(p)

        return {"Message":"Got {} search results".format(len(content_and_tags_hits)), "results":content_and_tags_hits_M} 

