"""
Серверная часть "EduConnect"
Разработчик: yarovich

Документация:
Основная ссылка: http://127.0.0.1:5000

POST /api/users:
    Принимает :
        json = {
            'login': str,  # Логин
            'email': str,  # Почта
            'password': str,  # Пароль
            'name': str,  # Имя
            'surname': str,  # Фамилия
            'role': int,  # Роль пользователя (0 - не указано, 1 - ученик, 2 - учитель, 3 - родитель)
        }
    Возвращает:
        ...

GET /api/users/<string:user_login>:

"""


from main import *
from websocket import *


if __name__ == "__main__":
    socketio.run(app, debug=True)
    # app.run(debug=True)
