from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from .models import User
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

def emailExists(email):

    u = User.objects(email=email)

    if len(u) != 1: # does not exist
        return False, {}
    else:
        return True, u[0]



@api.route('/add/')
class FriendsAdd(Resource):

    @api.doc('Access Token and add friend' ,parser=parser,body=friend_data)
    def post(self):
        data = api.payload
        print(data)
        args = parser.parse_args()
        print(args)
        user_email = tokenToEmail(args)
        if user_email == data.get('friend'):
            return {"Message":"You cannot add yourself as a friend"}
        if user_email is None:
            return {"Message":"Token Machine Broke"}, 400
        exists, user_obj = emailExists(user_email)
        if not exists:
            return {"Message":"Token email DNE"}, 400
        exists, friend_obj = emailExists(data.get('friend'))
        if not exists:
            return {"Message":"Friend email DNE"}, 400

        user_obj.friend_requests.append(friend_obj.email)
        
        try:
            user_obj.save()
        except Exception as e:
            print(e)
            return {"Message":"Something went wrong when updating the friends list"}, 400
        return {"Message":"Friends list updated successfully"}

        return {"Message":"Hit POST" }
@api.route('/delete/')
class FriendsDelete(Resource):
    @api.doc('Access Token and delete friend',parser=parser,body=friend_data)
    def post(self):
        data = api.payload
        args = parser.parse_args()
        user_email = tokenToEmail(args)
        return {"Message":"Hit POST" }

@api.route('/request/')
class FriendsRequest(Resource):

    @api.doc('Access Token and make friend request',parser=parser,body=friend_data)
    def post(self):
        data = api.payload
        args = parser.parse_args()
        user_email = tokenToEmail(args)


    



        return {"Message":"Hit POST" }

@api.route('/request_list/')
class FriendsRequestList(Resource):
    @api.doc('Access Token and get friend request list',parser=parser,body=friend_data)
    def post(self):
        data = api.payload
        args = parser.parse_args()
        user_email = tokenToEmail(args)

        return {"Message":"Hit POST" }

@api.route('/friends_list/')
class FriendsList(Resource):
    @api.expect(parser)
    def post(self):
        print("HEWWO")
        data = api.payload
        print(data)
        args = parser.parse_args()
        print(args)
        user_email = tokenToEmail(args)
        print(args)
        exists, user_obj = emailExists(user_email)
        if not exists:
            return {"Message":"Email DNE"}, 400


        friend_objs = (User.objects(email__in=user_obj.friends))

        if len(friend_objs) == 0:
            return {"Message":"User has no friends"}

        friends = []
        for friend in friend_objs:
             f = json.loads(friend.to_json())
             f['name'] = f['first_name'] + ' ' + f['last_name']
             friends.append(f)


        return {"Message":"Got back {} friends".format(len(friend_objs)), "friends":friends }
