from . import db
from flask_security import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash



DB_STRING_LENGTH = 120

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(DB_STRING_LENGTH), unique=True, nullable=False)
    email = db.Column(db.String(DB_STRING_LENGTH), unique=True, nullable=False)
    password = db.Column(db.String(DB_STRING_LENGTH),  nullable=False)
    first_name = db.Column(db.String(DB_STRING_LENGTH), nullable=False)
    last_name = db.Column(db.String(DB_STRING_LENGTH), nullable=False)
    address = db.Column(db.String(DB_STRING_LENGTH))
    phone_number = db.Column(db.String(DB_STRING_LENGTH), unique=True)
    date_of_birth = db.Column(db.String(DB_STRING_LENGTH))
    range = db.Column(db.String(DB_STRING_LENGTH))
    location = db.Column(db.String(DB_STRING_LENGTH))


    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)