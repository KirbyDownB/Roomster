from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from .models import User, Posting, Notification
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from . import socketio,client, twilio_phone
import json
from flask_socketio import send,emit

api = Namespace('like', description='Like a post')

posting_id = api.model('posting_id', {
    'posting_id': fields.String(description="posting id of liked post")
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
class Like(Resource):
    @api.doc('Access Token and like post',parser=parser,body=posting_id)
    def post(self):
        data = api.payload
        args = parser.parse_args()
        print(data)
        print(args)

        #print(Posting.objects.get(id=data.get('posting_id')).poster_email)
        
        user_email = tokenToEmail(args)

        if user_email is None:
            return {"Message":"Token machine BROKE"}, 400

        exists, user_obj = emailExists(user_email)

        if not exists:
            return {"Message":"There is no user with that email"}, 400


        if data.get('posting_id') is None:
            return {"Message":"Nothing was sent in the post body"}, 400

        


        exists, post_obj = postExists(data.get('posting_id'))

        if not exists:
            return {"Message":"This post does not exist"}, 400

        post_obj.likedEmails.append(user_email)

        user_obj.likedPosts.append(data.get('posting_id'))

        n = Notification(category="Feed",content="{} liked your post".format(user_email))
        
        p = User.objects.get(email=post_obj.poster_email)
        token = jwt.encode({'email':p.email}, "SECRET_KEY")
        token = token.decode('utf-8')



       

        try:
            user_obj.save()
            post_obj.save()
            n.save()
            client.messages.create(
                     body="{} liked your post".format(user_obj.first().first_name + ' ' + user_obj.first().last_name),
                     from_=twilio_phone,
                     to=user_obj.first().phone_number
                 )
            socketio.emit("{} notification".format(token), json.loads(n.to_json()))
        except Exception as e:
            print(e)
            return {"Message":"Something went wrong saving the user or posting"}, 400
        
        n = json.loads(n.to_json())
        p.notifications.append(n['_id']['$oid'])
        p.save()

        return {"Message":"Like successfully saved. Post updated, user updated" }, 202