from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from .models import User, Posting
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
import json

api = Namespace('undislike', description='Undislike a post')

posting_id = api.model('posting_id', {
    'posting_id': fields.String(description="posting id of undisliked post")
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

def emailExists(email):

    u = User.objects(email=email)

    if len(u) != 1: # does not exist
        return False, {}
    else:
        return True, u[0]

def postExists(post_id):

    p = Posting.objects(pk = post_id)
    print(p)
    if len(p) != 1:
        return False, {}
    
    else:
        return True, p[0]

@api.route('/')
class dislike(Resource):
    @api.doc('Access Token and dislike post',parser=parser,body=posting_id)
    def post(self):
        data = api.payload
        args = parser.parse_args()
        print(data)
        print(args)

        #print(Posting.objects.get(id=data.get('posting_id')).poster_email)
        
        user_email = tokenToEmail(args)

        if user_email is None:
            return {"Message":"Token machine BROKE"}, 400

        exists, user_obj = emailExists(user_email)  #********************

        if not exists:
            return {"Message":"There is no user with that email"}, 400


        if data.get('posting_id') is None:
            return {"Message":"Nothing was sent in the post body"}, 400

        


        exists, post_obj = postExists(data.get('posting_id'))   #*****************

        if not exists:
            return {"Message":"This post does not exist"}, 400

        if user_email in post_obj.dislikedEmails:
            post_obj.dislikedEmails.remove(user_email)

        if data.get('posting_id') in user_obj.dislikedPosts:
            user_obj.dislikedPosts.remove(data.get('posting_id'))
        

        try:
            user_obj.save()
            post_obj.save()
        except Exception as e:
            print(e)
            return {"Message":"Something went wrong saving the user or posting"}, 400
        
        return {"Message":"undislike successfully saved. Post updated, user updated" }, 202