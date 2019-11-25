from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from apis import api,app, socketio
from flask_socketio import send,emit

api.init_app(app)


@socketio.on('message')
def handle_message(message):
    print('received message: ' + str(message))
    send(message, broadcast=True)
    emit('my response', message)



if __name__ == "__main__":
    socketio.run(app, debug=True)
   