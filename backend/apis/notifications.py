from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from .models import User, Review
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
import json
from pprint import pprint
from datetime import datetime
api = Namespace('reviews', description='Review related operations')

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


@api.route('/all/')
class GetNotifs(Resource):
    @api.expect(parser)
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
            notifications.append(json.loads(n.to__json()))

        return {"Message":"Notifications retrieved successfully","Notifications":notifications}
