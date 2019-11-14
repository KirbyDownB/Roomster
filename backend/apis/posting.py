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
                           type=FileStorage, required=True,action='append')

parser.add_argument('content', type=str, help='The User\'s email')
parser.add_argument('tags', type=str, help='The User\'s password')

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
            for i in range(0,len(data.get('images'))):
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



            return {"Message":"posting successfully stored"}

        return {"Message":"Hit POST"}


@api.route('/all/')
class AllPosting(Resource):

    @api.expect(parser)
    def post(self):

        # postings= (json.loads(Posting.objects.to_json()))
        postings = []
        for posting in Posting.objects:
             p = json.loads(posting.to_json())
             d = (str(p['date']['$date'])[:-3])
             d = int(d)
             p['date'] = (datetime.utcfromtimestamp(d).strftime('%Y-%m-%d %H:%M:%S'))
             postings.append(p)
             
        random.shuffle(postings)

        return {"Message":"MEME","postings":postings}