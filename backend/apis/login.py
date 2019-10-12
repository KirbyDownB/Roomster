from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace

api = Namespace('login', description='Login related operations')

user = api.model('User', {
    'email': fields.String(description="User email"),
    'username': fields.String(description="User username"),
    'password': fields.String(description="User password")
})



@api.route('/')
class Login(Resource):
    def get(self):
        return {'hello': 'world'}

    @api.expect(user)
    def post(self):
        
        print(api.payload)
        data = api.payload
        return data


if __name__ == '__main__':
    app.run(debug=True)