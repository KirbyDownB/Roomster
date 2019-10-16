from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from apis import api,app

api.init_app(app)
app.run(debug=True)