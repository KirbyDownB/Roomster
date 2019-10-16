from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restplus import Api
from flask_migrate import Migrate


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = ''
db = SQLAlchemy(app)
migrate = Migrate(app, db)

api = Api(
    title='Roomster Backend',
    version='1.0',
    description='CS 180 Fall 2019 Project',
    # All API metadatas
)
from .login import api as ns_login
from .signup import api as ns_signup

api.add_namespace(ns_login, path='/api/login')
api.add_namespace(ns_signup, path='/api/signup')

