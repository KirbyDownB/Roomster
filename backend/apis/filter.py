from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from flask_mail import Message
from .models import User, Posting
from . import db, mail
from .models import User
import jwt
import json
api = Namespace('filter', description='Filter related operations')


filter_data = api.model('filter_data', {
    'gender': fields.String(description="Age", default=""),
    'location': fields.String(description="Location", default=""),
    'ethnicity' : fields.String(description='Ethnicity', default=""),
    'duration' : fields.String(description='Duration', default="")
})



@api.route('/')
class Search(Resource):

    @api.expect(filter_data)
    def post(self):
        return {"Hello":"World"}
