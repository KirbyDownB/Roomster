from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from .models import User, Review,Notification
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
import json
from pprint import pprint
from datetime import datetime
api = Namespace('reviews', description='Review related operations')

parser = api.parser()
parser.add_argument('Authorization',type=str,location='headers',help='Bearer Access Token', required=True)


delete_notification_data = api.model('delete_notification_data', {
    'notification_id': fields.String(description="New password")
})

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

@api.route('/get_notifications/')
class GetNotifsByToken(Resource):
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

        notifs = user_obj.first().notifications
        notifications = []
        for n in notifs:
            nnn = Notification.objects.get(pk=n)
            nn = json.loads(nnn.to_json())
            d = (str(nn['date']['$date'])[:-3])
            d = int(d)
            nn['date'] = (datetime.utcfromtimestamp(d).strftime('%Y-%m-%d %H:%M:%S'))
            nn['notification_id'] = nn['_id']['$oid']
            notifications.append(nn)
            

        return {"Message":"Notifications retrieved successfully","Notifications":notifications}

@api.route('/all/')
class GetNotifs(Resource):
    @api.doc(parser=parser,body=delete_notification_data)
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

        notifs = user_obj.first().notifications
        notifications = []
        for n in notifs:
            notifications.append(json.loads(n.to_json()))

        return {"Message":"Notifications retrieved successfully","Notifications":notifications}

@api.route('/delete/')
class DeleteNotifs(Resource):
    @api.doc(parser=parser, body=delete_notification_data)
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


        n = Notification.objects(pk=data.get('notification_id'))

        if len(n) > 0:
            try:
                user_obj.update_one(pull__notifications=data.get('notification_id'))
                n.delete()
            except Exception as e:
                print(e)
                return {"Message":"Something went wrong when deleting the notification"}, 400
        else:
            return {"Message":"The notification you tried to delete did not exist"}

        return {"Message":"Successfully deleted notification"}

@api.route('/delete_all/')
class DeleteNotifs(Resource):
    @api.expect(parser)
    def delete(self):
        args = parser.parse_args()
        print(args)
        user_email = tokenToEmail(args)

        if user_email is None:
            return {"Message":"Token machine BROKE"}, 400

        exists, user_obj = emailExists(user_email,2)

        if not exists:
            return {"Message":"There is no user with that email"}, 400
        try:
            for notification in user_obj.first().notifications:
                n = Notification.objects.get(pk=notification)
                user_obj.update_one(pull__notifications=notification)
                n.delete()
        except Exception as e:
            print(e)
            user_obj.update_one(notifications=[])





        return {"Message":"Deleted all notifications"}

        
