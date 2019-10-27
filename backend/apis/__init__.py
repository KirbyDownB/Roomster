import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restplus import Api
from flask_migrate import Migrate
from flask_mail_sendgrid import MailSendGrid


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)
app.config['MAIL_SENDGRID_API_KEY'] = os.getenv('SENDGRID_API_KEY')
mail = MailSendGrid(app)
migrate = Migrate(app, db)

api = Api(
    title='Roomster Backend',
    version='1.0',
    description='CS 180 Fall 2019 Project',
    # All API metadatas
)
site = "http://localhost:3000/"
endpoint_name = "resetPassword/"
from .login import api as ns_login
from .signup import api as ns_signup
from .passwordreset import api as ns_passwordreset
from .listings import api as ns_listings

api.add_namespace(ns_login, path='/api/login')
api.add_namespace(ns_signup, path='/api/signup')
api.add_namespace(ns_passwordreset, path="/api/reset")
api.add_namespace(ns_listings, path='/api/listings')