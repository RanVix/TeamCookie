import db
from main import *


@app.route('/api/register', methods=['POST'])
def register():
    """
        Принимает:
        json = {
            'login': str,  # Логин
            'email': str,  # Почта
            'password': str,  # Пароль
            'name': str,  # Имя
            'surname': str,  # Фамилия
            'role': int,  # Роль пользователя (0 - не указано, 1 - ученик, 2 - учитель, 3 - родитель)
            'school': Optional[str],  # Образовательное учреждение пользователя
        }

    """

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
    """
        Принимает:
        json = {
            'email': str,  # Почта
            'password': str,  # Пароль
        }

    """
    if request.method == 'POST':
        if not request.json:
            return flask.abort(400)
        data: dict = request.json
        user = db.check_user(data['email'], data['password'])
        if user is None:
            return flask.abort(404)
        return user.public_data


@app.route('/api/users/<string:user_login>', methods=['GET', 'PUT', 'DELETE'])
def users_login(user_login: int):
    if request.method == 'GET':
        ...

    if request.method == 'PUT':
        ...

    if request.method == 'DELETE':
        ...
