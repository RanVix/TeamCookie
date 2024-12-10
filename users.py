import flask

import db
import os
from main import *


@app.route('/api/register', methods=['POST'])
def register():
    if request.method == 'POST':
        if not request.json:
            return flask.abort(400)
        data: dict = request.json
        user = db.get_user(data['login'], data['email'])
        if user:
            return flask.abort(409)
        return db.save_user(data['login'], data['email'], data['password'], data['name'], data['surname'], data['role'])


@app.route('/api/login', methods=['POST'])
def login():
    if request.method == 'POST':
        email = request.headers.get('email')
        password = request.headers.get('password')
        user = db.check_user(email, password)
        if user is None:
            return flask.abort(404)
        return user.public_data


@app.route('/api/users/<string:user_login>', methods=['GET', 'PUT'])
def users(user_login: str):
    if request.method == 'GET':
        user = db.get_user(user_login)
        if user:
            return user.public_data
        return flask.abort(404)

    if request.method == 'PUT':
        email = request.headers.get('email')
        password = request.headers.get('password')
        user = db.check_user(email, password)
        if user is None:
            return flask.abort(403)

        if not request.json:
            return flask.abort(400)
        data: dict = request.json
        user.edit(data['name'], data['surname'], data['role'], data['description'])
        return user.public_data


@app.route('/api/users/<string:user_login>/avatar', methods=['GET', 'POST'])
def users_avatar(user_login: str):
    if request.method == 'GET':
        user = db.get_user(user_login)
        if user is None:
            return flask.abort(404)
        if user.avatar is None:
            return flask.abort(404)
        return flask.send_file(user.avatar, as_attachment=True)

    if request.method == 'POST':
        email = request.headers.get('email')
        password = request.headers.get('password')
        user = db.check_user(email, password)
        if user is None:
            return flask.abort(403)

        file = request.files['file']
        filepath = os.path.join('./documents/avatars', f'{user.id}.png')
        file.save(filepath)
        return flask.send_file(filepath, as_attachment=True)
