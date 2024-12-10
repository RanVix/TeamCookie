import flask
from flask import Flask, request
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit, join_room, leave_room

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)
api = Api(app)


@app.route("/")
@cross_origin()
def index():
    return "Hello, cross-origin-world!"


@app.errorhandler(400)
def bad_request(error):
    return flask.make_response(flask.jsonify({'error': 'Bad Request'}), 400)


@app.errorhandler(403)
def forbidden(error):
    return flask.make_response(flask.jsonify({'error': 'Forbidden'}), 403)


@app.errorhandler(404)
def not_found(error):
    return flask.make_response(flask.jsonify({'error': 'Not found'}), 404)


@app.errorhandler(409)
def not_found(error):
    return flask.make_response(flask.jsonify({'error': 'Already exists'}), 409)
