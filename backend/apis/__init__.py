import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restplus import Api
from flask_migrate import Migrate
from flask_mail_sendgrid import MailSendGrid
from flask_cors import CORS
from flask_mongoengine import MongoEngine
import pyrebase
from .keys import config, mongo_uri



firebase = pyrebase.initialize_app(config)
storage = firebase.storage()


app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'db': 'users',
    'host': mongo_uri
}
db = MongoEngine(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
# db = SQLAlchemy(app)
app.config['MAIL_SENDGRID_API_KEY'] = os.getenv('SENDGRID_API_KEY')
mail = MailSendGrid(app)
migrate = Migrate(app, db)
CORS(app)
api = Api(
    title='Roomster Backend',
    version='1.0',
    description='CS 180 Fall 2019 Project',
    # All API metadatas
)
site = "http://localhost:3000/"
endpoint_name = "reset/"
from .login import api as ns_login
from .signup import api as ns_signup
from .passwordreset import api as ns_passwordreset
from .listings import api as ns_listings
from .update_profile import api as ns_update_profile
from .search import api as ns_search
from .friends import api as ns_friends
from .retrieve_profile import api as ns_retrieve_profile
from .posting import api as ns_posting
from .like import api as ns_like
from .dislike import api as ns_dislike
from .filter import api as ns_filter
from .unlike import api as ns_unlike
from .undislike import api as ns_undislike
from .reviews import api as ns_reviews

from .notifications import api as ns_notifications
from .groups import api as ns_groups



api.add_namespace(ns_login, path='/api/login')
api.add_namespace(ns_signup, path='/api/signup')
api.add_namespace(ns_passwordreset, path="/api/reset")
api.add_namespace(ns_listings, path='/api/listings')
api.add_namespace(ns_update_profile, path='/api/update_profile')
api.add_namespace(ns_search, path='/api/search')
api.add_namespace(ns_friends,path='/api/friends')
api.add_namespace(ns_retrieve_profile, path='/api/retrieve_profile')
api.add_namespace(ns_posting, path='/api/posting')
api.add_namespace(ns_like, path='/api/like')
api.add_namespace(ns_dislike, path='/api/dislike')
api.add_namespace(ns_filter, path='/api/filter')
api.add_namespace(ns_unlike, path='/api/unlike')
api.add_namespace(ns_undislike, path='/api/undislike')

api.add_namespace(ns_reviews, path='/api/reviews')
api.add_namespace(ns_notifications, path='/api/notifications')

api.add_namespace(ns_reviews, path='/api/reviews')

