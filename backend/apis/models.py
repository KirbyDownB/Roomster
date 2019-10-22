from . import db
from flask_security import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash



DB_STRING_LENGTH = 120

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(DB_STRING_LENGTH), unique=True, nullable=False)
    email = db.Column(db.String(DB_STRING_LENGTH), unique=True, nullable=False)
    password_hash = db.Column(db.String(DB_STRING_LENGTH),  nullable=False)
    first_name = db.Column(db.String(DB_STRING_LENGTH), nullable=False)
    last_name = db.Column(db.String(DB_STRING_LENGTH), nullable=False)
    address = db.Column(db.String(DB_STRING_LENGTH))
    phone_number = db.Column(db.String(DB_STRING_LENGTH), unique=True)
    date_of_birth = db.Column(db.String(DB_STRING_LENGTH))
    range = db.Column(db.String(DB_STRING_LENGTH))
    location_of_interest = db.Column(db.String(DB_STRING_LENGTH))
    age = db.Column(db.String(DB_STRING_LENGTH))
    price_range = db.Column(db.String(DB_STRING_LENGTH))
    pf_pic = db.Column(db.String(DB_STRING_LENGTH))
    bio = db.Column(db.String(DB_STRING_LENGTH))
    number_of_roommates = db.Column(db.String(DB_STRING_LENGTH))
    ethnicity = db.Column(db.String(DB_STRING_LENGTH))
    price_range_min = db.Column(db.String(DB_STRING_LENGTH))
    price_range_max = db.Column(db.String(DB_STRING_LENGTH))
    ethnicity = db.Column(db.String(DB_STRING_LENGTH))
    duration = db.Column(db.String(DB_STRING_LENGTH))




    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)