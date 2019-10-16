from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from .models import User
from . import db
from .models import User

api = Namespace('signup', description='Signup related operations')

user = api.model('User', {
    'email': fields.String(description="User email"),
    'username': fields.String(description="User username"),
    'password': fields.String(description="User password"),
    'first_name': fields.String(description="Address"),
    'last_name':fields.String(description="Phone Number"),
    'address': fields.String(description="Address"),
    'phone_number':fields.String(description="Phone Number"),
    'age': fields.String(description="Age"),
    'range': fields.String(description="Age"),
    'location': fields.String(description="Address"),
})




@api.route('/')
class Signup(Resource):
    def get(self):
        return {"Hey":"You sent a GET request"}

    @api.expect(user)
    def post(self):
        
        #u.set_password('P@ssw0rd')
        #db.session.add(u)
        #db.session.commit()
        print(api.payload)
        data = api.payload
        u = User(email=data.get('email'), username=data.get('username'), first_name=data.get('first_name'),\
        last_name=data.get('last_name'), address=data.get('address'), phone_number=data.get('phone_number'), \
        age=data.get('age'), range=data.get('range'), location=data.get('location'))

        u.set_password(data.get('password'))

        db.session.add(u)
        db.session.commit()




        return data