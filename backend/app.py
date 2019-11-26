from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from apis import api,app, socketio
from flask_socketio import send,emit

api.init_app(app)


@socketio.on('test')
def handle_message(message):
    print('received message: ' + str(message))
    send(message, broadcast=True)
    emit('Hi Eric', message)
@socketio.on('connect')
def on_connect():
    print('user connected')
    emit('success', 'Im the server')

#friend request
# any feed activity (like dislike)
# review
#for all of these actions, construct a notification object and store it in the User's list



if __name__ == "__main__":
    socketio.run(app, debug=True)
   