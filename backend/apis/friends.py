from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from .models import User, Notification
from . import socketio,client, twilio_phone
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
import json

api = Namespace('friends', description='Friends related operations')

friend_data = api.model('friend_data', {
    'friend': fields.String(description="User email or username"),
})
parser = api.parser()
parser.add_argument('Authorization',type=str,location='headers',help='Bearer Access Token', required=True)

parser.add_argument('friend', type=str, help='The friend\'s email')
# deepcopy the dict, add the name frield in the dict, make it data.get('first_name') + ' ' + data.get('last_name')
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


@api.route('/request/')
class FriendsAdd(Resource):

    @api.doc('Access Token and add friend' ,parser=parser,body=friend_data)
    def post(self):
        data = api.payload
        print(data)
        args = parser.parse_args()
        print(args)
        user_email = tokenToEmail(args)
        if user_email == data.get('friend'):
            return {"Message":"You cannot add yourself as a friend"}, 400
        if user_email is None:
            return {"Message":"Token Machine Broke"}, 400
        exists, user_obj = emailExists(user_email,2)
        if not exists:
            return {"Message":"Token email DNE"}, 400
        exists, friend_obj = emailExists(data.get('friend'),2)
        if not exists:
            print("HELLO")
            return {"Message":"Friend email DNE"}, 400

        if user_obj(friends__all=[friend_obj.first().email]):
            return {"Message":"You're already friends with this user"}, 400
        
        
        n = Notification(category="Friend Request",content="{} sent you a friend request".format(user_obj.first().first_name + ' ' + user_obj.first().last_name))
        
        p = User.objects.get(email=friend_obj.first().email)
        p.notifications.append(n)
        token = jwt.encode({'email':p.email}, "SECRET_KEY")
        token = token.decode('utf-8')
        try:
            friend_obj.update_one(add_to_set__friend_requests=user_obj.first().email)
            n.save()
            n['notification_id'] = json.loads(n.to_json())['_id']['$oid']
            client.messages.create( \
                    body="{} sent you a friend request".format(user_obj.first().first_name + ' ' + user_obj.first().last_name), \
                    from_=twilio_phone, \
                    to=friend_obj.first().phone_number \
                )
            socketio.emit("{} notification".format(token), json.loads(n.to_json()))
        except Exception as e:
            print(e)
            return {"Message":"Something went wrong when updating the friends list"}, 400

        n = json.loads(n.to_json())
        p.notifications.append(n['_id']['$oid'])
        p.save()

        return {"Message":"Friends request list updated successfully"}

@api.route('/delete_friend_request/')
class FriendRequestsDelete(Resource):
    @api.doc('Access Token and delete friend request',parser=parser,body=friend_data)
    def delete(self):
        data = api.payload
        args = parser.parse_args()
        user_email = tokenToEmail(args)
        if user_email is None:
            return {"Message":"Token Machine BROKE"}, 400

        exists, user_obj = emailExists(user_email,2)

        if not exists:
            return {"Message":"The email in the token DNE"}, 400

        exists, friend_obj = emailExists(data.get('friend'),2)

        if not exists:
            return {"Message":"The friend you tried to add DNE"}, 400

        
        if len(user_obj(friend_requests__all=[friend_obj.first().email])) < 1: #check this statment and other like it. It might be breaking things!!!!!!
            return {"Message":"This person has to send you a request before you can delete it"}

        
        try:
            user_obj.update_one(pull__friend_requests=friend_obj.first().email)
        except Exception as e:
            print(e)
            return {"Message":"Something went wrong when try to delete the friend request"}, 400

        return {"Message":"Friend request list updated successfully"}

@api.route('/delete_friend/')
class FriendsDelete(Resource):
    @api.doc('Access Token and delete friend',parser=parser,body=friend_data)
    def delete(self):
        data = api.payload
        args = parser.parse_args()
        user_email = tokenToEmail(args)
        if user_email is None:
            return {"Message":"Token Machine BROKE"}, 400

        exists, user_obj = emailExists(user_email,2)

        if not exists:
            return {"Message":"The email in the token DNE"}, 400

        exists, friend_obj = emailExists(data.get('friend'),2)

        if not exists:
            return {"Message":"The friend you tried to add DNE"}, 400

        
        if len(user_obj(friends__all=[friend_obj.first().email])) < 1: #check this statment and other like it. It might be breaking things!!!!!!
            return {"Message":"Somone has to be your friend before you can delete them"},400

        
        try:
            user_obj.update_one(pull__friends=friend_obj.first().email)
            friend_obj.update_one(pull__friends=user_obj.first().email)
        except Exception as e:
            print(e)
            return {"Message":"Something went wrong when try to delete the friend"}, 400

        return {"Message":"Friend list updated successfully"}

@api.route('/add_friend_request/')
class FriendsRequest(Resource):

    @api.doc('Access Token and make friend request',parser=parser,body=friend_data)
    def post(self):
        data = api.payload
        args = parser.parse_args()
        user_email = tokenToEmail(args)
        if user_email == data.get('friend'):
            return {"Message":"You cannot add yourself as a friend"}, 400
        if user_email is None:
            return {"Message":"Token Machine Broke"}, 400
        exists, user_obj = emailExists(user_email,2)
        if not exists:
            return {"Message":"Token email DNE"}, 400
        exists, friend_obj = emailExists(data.get('friend'),2)
        if not exists:
            return {"Message":"Friend email DNE"}, 400

        if len(user_obj(friend_requests__all=[friend_obj.first().email])) != 1:
            return {"Message":"You have to send a friend request before you become someones friend"}, 400

        
        
        try:
            user_obj.update_one(add_to_set__friends=friend_obj.first().email) #person who recieved frriend request
            user_obj.update_one(pull__friend_requests=friend_obj.first().email)
            friend_obj.update_one(add_to_set__friends=user_obj.first().email)
        except Exception as e:
            print(e)
            return {"Message":"Something went wrong when updating the friends list"}, 400
        
        return {"Message":"Friends list updated successfully"}


@api.route('/request_list/')
class FriendsRequestList(Resource):
    @api.expect(parser)
    def get(self):
        data = api.payload
        args = parser.parse_args()
        user_email = tokenToEmail(args)
        exists, user_obj = emailExists(user_email,1)
        if not exists:
            return {"Message":"Email DNE"}, 400


        friend_request_objs = (User.objects(email__in=user_obj.friend_requests))

        if len(friend_request_objs) == 0:
            return {"Message":"User has no friend requests", "friends":[]}

        friends = []
        for friend in friend_request_objs:
             f = json.loads(friend.to_json())
             f['name'] = f['first_name'] + ' ' + f['last_name']
             friends.append(f)


        return {"Message":"Got back {} friends".format(len(friend_request_objs)), "friends":friends }


        return {"Message":"Hit POST" }

@api.route('/friends_list/')
class FriendsList(Resource):
    @api.expect(parser)
    def get(self):
        print("HEWWO")
        data = api.payload
        print(data)
        args = parser.parse_args()
        print(args)
        user_email = tokenToEmail(args)
        print(args)
        exists, user_obj = emailExists(user_email,1)
        if not exists:
            return {"Message":"Email DNE"}, 400


        friend_objs = (User.objects(email__in=user_obj.friends))

        if len(friend_objs) == 0:
            return {"Message":"User has no friends", "friends":[]}

        friends = []
        for friend in friend_objs:
             f = json.loads(friend.to_json())
             f['name'] = f['first_name'] + ' ' + f['last_name']
             friends.append(f)


        return {"Message":"Got back {} friends".format(len(friend_objs)), "friends":friends }
