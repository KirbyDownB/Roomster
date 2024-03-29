from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from .models import User, Review, Group, GroupPosting
from . import socketio,client, twilio_phone
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
import json
from pprint import pprint
from datetime import datetime
api = Namespace('reviews', description='Review related operations')
group_data = api.model('group_data', {
    'new_group_member': fields.String(description="User email or username"),
    'group_id':fields.String(description="User email or username")
})
just_group_id = api.model('just_group_id', {
    'group_id':fields.String(description="User email or username")
})
create_group = api.model('create_group',{
    'group_name':fields.String(description='name'),

})
create_posting_in_group = api.model('create_posting_in_group',{
    'name':fields.String(description='member emails'),
    'content':fields.String(description='member emails')
})
delete_posting_in_group = api.model('create_posting_in_group',{
    'posting_id':fields.String(description='member emails'),
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


@api.route('/add/')
class AddFriendToGroup(Resource):
    @api.doc('Access Token and delete friend request',parser=parser,body=group_data)
    def post(self):
        data = api.payload
        args = parser.parse_args()
        print(data)
        print(args)
        user_email = tokenToEmail(args)

        if user_email is None:
            return {"Message":"Token machine BROKE"}, 400

        exists, user_obj = emailExists(user_email,2)

        if not exists:
            return {"Message":"There is no user with that email"}, 400

        if data.get('new_group_member') is None:
            return {"Message":"Nothing was sent in the post body"}, 400

        exists, friend_obj = emailExists(data.get('new_group_member'),2)
        if not exists:
            print("HELLO")
            return {"Message":"Friend email DNE"}, 400

        
        if not user_obj(friends__all=[friend_obj.first().email]):
            return {"Message":"You aren't friends with this user. Please send this user a friend request before you add them to a group."}, 400

        if len(friend_obj.first().group) > 0:
            return {"Message":"Sorry, this person is already part of a group"}, 400
        
        group = Group.objects.get(pk=data.get('group_id'))

        if not group:
            return {"Message":"This group does not exist"}, 400


        if len(group.members) >= 5:
            return {"Message":"Sorry, it looks like there are too many people in the group already"}, 400

        group.members.append(data.get('new_group_member'))

        try:
            group.save()
            friend_obj.update_one(group=data.get('group_id'))
        except Exception as e:
            print(e)
            return {"Message":"Something went wrong when trying to add this member to the group"}, 400

        return {"Message":"Group member list updated successfully"}

@api.route('/get_all_members/')
class AddFriendToGroup(Resource):
    @api.expect(just_group_id)
    def post(self):
        data = api.payload

        group = Group.objects.get(pk=data.get('group_id'))

        if not group:
            return {"Message":"This group does not exist"}, 400
        group_users = []
        for member in group.members:
            u = User.objects.get(email=member)
            if u is not None:
                U = json.loads(\
                    u.to_json())
                group_users.append(U)

        return {"Message":"Users retrieved successfully", "Members": group_users}

            
            

@api.route('/create/')
class CreateGroup(Resource):
    @api.doc('Access Token and delete friend request',parser=parser,body=create_group)
    def post(self):
        data = api.payload
        args = parser.parse_args()
        print(data)
        print(args)

        user_email = tokenToEmail(args)

        if user_email is None:
            return {"Message":"Token machine BROKE"}, 400

        exists, user_obj = emailExists(user_email,2)

        if not exists:
            return {"Message":"There is no user with that email"}, 400
        group_M = []
        group_M.append(user_email)
        group = Group(name=data.get('group_name'), members=group_M)

        try:
            group.save()
            for m in group_M:
                u = User.objects.get(email=m)
                u.group = json.loads(group.to_json())['_id']['$oid']
                u.save()
        except Exception as e:
            print(e)
            return {"Message":"Something went wrong when trying to save the group"}

        return {"Message":"Group saved successfully"}


@api.route('/leave/')
class LeaveGroup(Resource):
    @api.expect(parser)
    def get(self):
        args = parser.parse_args()
        print(args)
        user_email = tokenToEmail(args)

        if user_email is None:
            return {"Message":"Token machine BROKE"}, 400

        exists, user_obj = emailExists(user_email,2)

        if not exists:
            return {"Message":"There is no user with that email"}, 400

        
        g = Group.objects.get(pk=user_obj.first().group)
        if len(g.members) > 2:
            try:
                user_obj.update_one(group="")
            except Exception as e:
                print(e)
                return {"Message":"Something went wrong when trying to remove you from the group"}, 400
            

            return {"Message":"Successfully removed you from the group"}
        else:
            print("Hello group delete")
            try:
                for member in g.members:
                    u = User.objects.get(email=member)
                    u.group = ""
                    u.save()
                g.delete()
            except Exception as e:
                return {"Message":"Something went wrong when trying to delete you from the group and delete the group"}, 400

            return {"Message":"Successfully removed you from the group"}
@api.route('/delete_group/')
class DeleteGroup(Resource):
    @api.expect(parser)
    def get(self):
        args = parser.parse_args()
        print(args)
        user_email = tokenToEmail(args)

        if user_email is None:
            return {"Message":"Token machine BROKE"}, 400

        exists, user_obj = emailExists(user_email,2)

        if not exists:
            return {"Message":"There is no user with that email"}, 400

        
        g = Group.objects.get(pk=user_obj.first().group)
        # if len(g.members) > 2:
        #     try:
        #         user_obj.update_one(group="")
        #     except Exception as e:
        #         print(e)
        #         return {"Message":"Something went wrong when trying to remove you from the group"}
            

        #     return {"Message":"Successfully removed you from the group"}
        # else:
        #     print("Hello group delete")
        try:
            for member in g.members:
                u = User.objects.get(email=member)
                u.group = ""
                u.save()
            g.delete()
        except Exception as e:
            print(e)
            return {"Message":"Something went wrong when trying to delete you from the group and delete the group"}, 400

        return {"Message":"Successfully removed you from the group and deleted group"}


@api.route('/create_post/')
class CreatePostInGroup(Resource):
    @api.doc('Access Token and delete friend request',parser=parser,body=create_posting_in_group)
    def post(self):
        data = api.payload
        args = parser.parse_args()
        print(data)
        print(args)

        user_email = tokenToEmail(args)

        if user_email is None:
            return {"Message":"Token machine BROKE"}, 400

        exists, user_obj = emailExists(user_email,2)

        if not exists:
            return {"Message":"There is no user with that email"}, 400


        if data.get('name') is None or data.get('content') is None:
            return {"Message":"Post body empty"}

        gp = GroupPosting(name=data.get('name'), content=data.get('content'),poster_email=user_email)
        gp.save()
        group = Group.objects.get(pk=user_obj.first().group)
        #print(group.members[0]+"   \n\n\n\n  "+group.members[1])

        group.posts_in_group.append(json.loads(gp.to_json())['_id']['$oid'])

        phoneNumbers = []

        for member in group.members:
            u = User.objects.get(email=member)
            if u:
                phoneNumbers.append(u.phone_number)
                print("aaaaaa"+"\n\n\n\n\n\n")

        try:
            group.save()
            for numbers in phoneNumbers:
                if numbers != user_obj.first().phone_number:
                    client.messages.create( \
                        body="{} posted in the group '{}'".format(user_obj.first().first_name + ' ' + user_obj.first().last_name, group.name),  \
                        from_=twilio_phone, \
                        to=numbers\
                    )
        except Exception as e:
            print(e)
            return {"Something went wrong when trying to submit your post"}, 400

        return {"Message":"Successfully submitted post to group"}

@api.route('/delete_post/')
class DeletePostInGroup(Resource):
    @api.doc('Access Token and delete friend request',parser=parser,body=delete_posting_in_group)
    def delete(self):
        data = api.payload
        args = parser.parse_args()
        print(data)
        print(args)

        user_email = tokenToEmail(args)

        if user_email is None:
            return {"Message":"Token machine BROKE"}, 400

        exists, user_obj = emailExists(user_email,2)

        if not exists:
            return {"Message":"There is no user with that email"}, 400

        g = Group.objects(pk=user_obj.first().group)
        print(g)
        gp = GroupPosting.objects.get(pk=data.get('posting_id'))

        if user_email != gp.poster_email:
            return {"Message":"You can't delete a post that's not your\'s"}, 400

        
        try:
            g.update_one(pull__posts_in_group=data.get('posting_id'))

        except Exception as e:
            print(e)
            return {"Message":"Something went wrong when trying to delete your post"},400

        return {"Message":"Successfully deleted post from group"}






@api.route('/group/')
class GetGroup(Resource):
    @api.expect(parser)
    def get(self):
        args = parser.parse_args()
        print(args)
        user_email = tokenToEmail(args)

        if user_email is None:
            return {"Message":"Token machine BROKE"}, 400

        exists, user_obj = emailExists(user_email,2)

        if not exists:
            return {"Message":"There is no user with that email"}, 400

        
        print("GRoup:   ", user_obj.first().group)
        if user_obj.first().group == "" or len(user_obj.first().group) == 0:
            return {"Message":"This user is not a part of any group"}

        g = json.loads(Group.objects.get(pk=user_obj.first().group).to_json())
        gps = []
        for posting in g['posts_in_group']:
            gp = GroupPosting.objects.get(pk=posting)
            gp = json.loads(gp.to_json())
            d = (str(gp['date']['$date'])[:-3])
            d = int(d)
            gp['date'] = (datetime.utcfromtimestamp(d).strftime('%Y-%m-%d %H:%M:%S'))
            poster = User.objects.get(email=gp['poster_email'])
            poster = poster.to_json()
            poster = json.loads(poster)
            poster['name'] = poster['first_name'] + ' ' + poster['last_name']
            gp['user'] = poster 
            gp['posting_id'] = gp['_id']['$oid']
            gps.append(gp)

        g['posts_in_group'] = gps
        group_users = []
        for member in g['members']:
            u = User.objects.get(email=member)
            if u is not None:
                U = json.loads(\
                    u.to_json())
                U['name'] = U['first_name'] + ' '  + U['last_name']
                group_users.append(U)

        g['members'] = group_users
        g['group_id'] = g['_id']['$oid']
        

        return {"Message":"Successfully got the group", "group":g}