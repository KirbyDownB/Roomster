from flask_restplus import Api

from .login import api as ns_login


api = Api(
    title='Roomster Backend',
    version='1.0',
    description='CS 180 Fall 2019 Project',
    # All API metadatas
)

api.add_namespace(ns_login, path='/login')
