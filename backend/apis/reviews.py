from flask import Flask
from flask_restplus import Resource, Api, fields, Namespace
from .models import User, Review, Notification
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
import json
from pprint import pprint
from datetime import datetime
from . import socketio,client, twilio_phone
api = Namespace('reviews', description='Review related operations')

posting_id = api.model('posting_id', {
    'email': fields.String(description="email of person being reviewed"),
    'content': fields.String(description="Content of review"),
    'numStars': fields.Float(description="number of stars in review")

})
friend_data = api.model('friend_data_for_review', {
    'friend': fields.String(description="User email or username"),
})

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


@api.route('/add/')
class AddReview(Resource):
    @api.doc('Access Token and post review',parser=parser,body=posting_id)
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

        if data.get('email') is None:
            return {"Message":"Nothing was sent in the post body"}, 400

        exists, friend_obj = emailExists(data.get('email'),2)

        if not exists:
            return {"Message":"There is no user with that email"}, 400

        if len(user_obj(friends__all=[friend_obj.first().email])) < 1: #check this statment and other like it. It might be breaking things!!!!!!
            return {"Message":"Somone has to be your friend before you can review them"},400


        review = Review(rater_email=user_email, person_who_was_rated_email=friend_obj.first().email, num_stars=data.get('numStars'), content=data.get('content'))


        print(review.person_who_was_rated_email)

        n = Notification(category="Feed",content="{} posted a review about you".format(user_obj.first().first_name + ' ' + user_obj.first().last_name))
        
        p = User.objects.get(email=friend_obj.first().email)
        
        token = jwt.encode({'email':p.email}, "SECRET_KEY")
        token = token.decode('utf-8')

        try:
            review.save()
            n.save()
            n['notification_id'] = n['_id']['$oid']
            client.messages.create( \
                     body="{} posted a review about you".format(user_obj.first().first_name + ' ' + user_obj.first().last_name), \
                     from_=twilio_phone, \
                     to=friend_obj.first().phone_number \
                 )
            socketio.emit("{} notification".format(token), json.loads(n.to_json()))
        except Exception as e:
            print(e)
            {"Message":"Something went wrong when saving the review"}, 400

        r = json.loads(Review.objects(rater_email=user_email, person_who_was_rated_email=friend_obj.first().email,\
             num_stars=data.get('numStars'), content=data.get('content')).first().to_json())
        print(r['_id']['$oid'])

        user_obj.update_one(add_to_set__my_reviews=r['_id']['$oid'])
        friend_obj.update_one(add_to_set__reviews=r['_id']['$oid'])
        n = json.loads(n.to_json())
        p.notifications.append(n['_id']['$oid'])
        p.save()

        return {"Message":"The review was saved successfully and added to both lists"}



@api.route('/all/')
class AllReview(Resource):
    @api.expect(parser)
    def get(self):
        args = parser.parse_args()
        print(args)

        user_email = tokenToEmail(args)

        if user_email is None:
            return {"Message":"Token machine BROKE"}, 400

        exists, user_obj = emailExists(user_email,2)

        if not exists:
            return {"Message":"There is no user with that email"}, 400

        otherReviews = []
        for i in range (0, len(user_obj.first().reviews)):
            r = Review.objects.get(pk=user_obj.first().reviews[i]).to_json()
            r = json.loads(r)
            d = (str(r['date']['$date'])[:-3])
            d = int(d)
            r['date'] = (datetime.utcfromtimestamp(d).strftime('%Y-%m-%d %H:%M:%S'))
            otherReviews.append(r)
            
        my_reviews = []
        for i in range (0, len(user_obj.first().my_reviews)):
            
                
            r = json.loads(\
                Review.objects.get(pk=user_obj.first().my_reviews[i]).to_json())

            print(r)
            u = User.objects.get(email=r['person_who_was_rated_email'])
            name = u.first_name + ' ' + u.last_name
            r['name'] = name
            d = (str(r['date']['$date'])[:-3])
            d = int(d)
            r['date'] = (datetime.utcfromtimestamp(d).strftime('%Y-%m-%d %H:%M:%S'))
            my_reviews.append(r)


        return {"Message":"Data retrieved successfully", "otherReviews": otherReviews, "my_reviews":my_reviews, }

@api.route('/friend_reviews/')
class AddReview(Resource):
    @api.doc('Access Token and post review',parser=parser,body=friend_data)
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

        if data.get('friend') is None:
            return {"Message":"Nothing was sent in the post body"}, 400

        exists, friend_obj = emailExists(data.get('friend'),2)

        if not exists:
            return {"Message":"There is no user with that email"}, 400

        if len(user_obj(friends__all=[friend_obj.first().email])) < 1: #check this statment and other like it. It might be breaking things!!!!!!
            return {"Message":"Somone has to be your friend before you can see their reviews"},400

        reviews_about_user = []
        for review in friend_obj.first().reviews:
            r = Review.objects.get(pk=review)

            r = json.loads(r.to_json())
            u = User.objects.get(email=r['rater_email'])
            r['name'] = u.first_name + ' ' + u.last_name
            d = (str(r['date']['$date'])[:-3])
            d = int(d)
            r['date'] = (datetime.utcfromtimestamp(d).strftime('%Y-%m-%d %H:%M:%S'))
            reviews_about_user.append(r)

        return {"Message":"Reviews retrieved successfully", "Reviews":reviews_about_user}


