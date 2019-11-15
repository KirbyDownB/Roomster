from . import db
from datetime import datetime



class User(db.DynamicDocument):

    email = db.EmailField(unique = True,required = True)
    password_hash = db.StringField(required=True)
    first_name = db.StringField()
    last_name = db.StringField()
    # address = db.StringField()
    phone_number = db.StringField()
    date_of_birth = db.StringField()
    gender = db.StringField()
    range = db.StringField()
    location_of_interest =db.StringField()
    age = db.StringField()
    pf_pic = db.URLField()
    bio = db.StringField()
    number_of_roommates = db.StringField()
    ethnicity = db.StringField()
    price_range_min = db.StringField()
    price_range_max = db.StringField()
    duration = db.StringField()
    friend_requests = db.ListField()
    friends = db.ListField()
    occupation = db.StringField()
    likedPosts = db.ListField()
    dislikedPosts = db.ListField()

class Posting(db.DynamicDocument):

    name = db.StringField()
    poster_email = db.EmailField()
    date = db.DateTimeField(default=datetime.now())
    content = db.StringField()
    tags = db.ListField()
    likedEmails = db.ListField()
    dislikedEmails = db.ListField()
    images = db.ListField()





    # def set_password(self, password):
    #     self.password_hash = generate_password_hash(password)

    # def check_password(self, password):
    #     return check_password_hash(self.password_hash, password)