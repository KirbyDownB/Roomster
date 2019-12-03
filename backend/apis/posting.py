from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from .models import User, Posting
from . import storage
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
import json
from werkzeug.datastructures import FileStorage
from datetime import datetime
import random


api = Namespace('postings', description='postings related operations')

parser = api.parser()
parser.add_argument('Authorization',type=str,location='headers',help='Bearer Access Token', required=True)

parser.add_argument('images', location='files',
                           type=FileStorage, required=False,action='append')

parser.add_argument('content', type=str, help='The User\'s email', required=False)
parser.add_argument('tags', type=str, help='The User\'s password', required=False)

def tokenToEmail(args):

    token = args['Authorization']

    if not token:
        return None
    try:
        decToken = jwt.decode(token,"SECRET_KEY")
    except:
        return None

    return  decToken.get('email')

def emailExists(email):

    u = User.objects(email=email)

    if len(u) != 1: # does not exist
        return False, {}
    else:
        return True, u[0]


@api.route('/add/')
class AddPosting(Resource):

    @api.expect(parser)
    def post(self):
        print("HI IVE ENTERED POST")
        args = data =  parser.parse_args()
        print(data)
        # find that persons name
        email = tokenToEmail(args)
        if email is None:
            return {"Message":"Token machine broke"}, 400
        does_email_exist, user_obj = emailExists(email)
        if does_email_exist:
            full_name = user_obj.first_name + ' ' + user_obj.last_name

            p = Posting(name=full_name, poster_email=email,content=data.get('content'), tags=(data.get('tags').split(',')))
            # then takes images, upload them, and come up with some dumb schema
            # 
            image_list = []
            image_array = data.get('images')
            if image_array is None:
                image_array = []
            for i in range(0,len(image_array)):
                filename = str(full_name + (p.date.strftime('%m/%d/%Y'))+ str(i))
                storage.child(filename).put(data.get('images')[i])
                image_list.append(storage.child(filename).get_url(None))         

            p.images = image_list
            print(p)
            try:
                p.save()
            except Exception as e:
                print(e)
                return {"Message":"Something went wrong when saving the post"}, 400



            return {"Message":"Posting successfully stored"}

        return {"Message":"That user does not exist"}, 400


@api.route('/all/')
class AllPosting(Resource):

    def post(self):
        args = parser.parse_args()
        user_email = tokenToEmail(args)
        if user_email is None:
            return {"Message":"Token machine BROKE"}, 400
        exists, user_obj = emailExists(user_email)
        if not exists:
            return {"Message":"That user does not exist"}, 400

        
        # postings= (json.loads(Posting.objects.to_json()))
        postings = []
        for posting in Posting.objects:
             p = json.loads(posting.to_json())
             d = (str(p['date']['$date'])[:-3])
             d = int(d)
             p['date'] = (datetime.utcfromtimestamp(d).strftime('%Y-%m-%d %H:%M:%S'))
             p['posting_id'] = p['_id']['$oid']
             postings.append(p)
             
        #random.shuffle(postings)
        postings = sorted(postings, key=lambda x: x['date'], reverse=True)

        all_possible_locations = []
        durations = []
        ethnicities = []
        Pmin = []
        Pmax = []
        for user in User.objects:
            all_possible_locations.append(user.location_of_interest)
            durations.append(user.duration)
            ethnicities.append(user.ethnicity)

            if user.price_range_min is not None:
                Pmin.append(int(user.price_range_min))

            if user.price_range_max is not None:
                Pmax.append(int(user.price_range_max))


        all_possible_locations = list(set(all_possible_locations))
        durations = list(set(durations))
        ethnicities = list(set(ethnicities))


        return {"Message":"MEME","postings":postings, "likedIds":user_obj.likedPosts, "dislikedIds": user_obj.dislikedPosts, "locations":all_possible_locations,
            "durations":durations, "ethnicities":ethnicities, "priceMin":min(Pmin), "priceMax":max(Pmax)}