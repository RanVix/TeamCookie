"""
Серверная часть "EduConnect"
Разработчик: yarovich

Документация:
Основная ссылка: http://127.0.0.1:5000


POST /api/register :
    Регистрация пользователя

    Принимает:
        json = {
            'login': str,  # Логин
            'email': str,  # Почта
            'password': str,  # Пароль
            'name': str,  # Имя
            'surname': str,  # Фамилия
            'role': int,  # Роль пользователя (0 - не указано, 1 - ученик, 2 - учитель, 3 - родитель)
        }

    Возвращает:
        status 400:
            Неверный запрос.

        status 409:
            Данный пользователь уже существует

        status 200:
            json = {
                'login': str,
                'name': str,
                'surname': str,
                'role': int,
                'description': str,
            }


POST /api/login :
    Логин пользователя

    Принимает:
        headers = {
            'email': str,  # Почта
            'password': str,  # Пароль
        }

    Возвращает:
        status 400:
            Неверный запрос.

        status 404:
            Не найдено (не верная почта или пароль)

        status 200:
            json = {
                'login': str,
                'name': str,
                'surname': str,
                'role': int,
                'description': str,
            }


GET /api/users/<string:user_login> :
    Информация о пользователе

    Возвращает:
        status 404:
            Не найдено

        status 200:
            json = {
                'login': str,
                'name': str,
                'surname': str,
                'role': int,
                'description': str,
            }


PUT /api/users/<string:user_login> :
    Изменить пользователя

    Принимает:
        headers = {
            'email': str,  # Почта
            'password': str,  # Пароль
        }
        json = {
            'name': str,
            'surname': str,
            'role': int,
            'description': str,
        }

    Возвращает:
        status 400:
            Неверный запрос.

        status 403:
            Нет доступа (неверный пароль или почта)

        status 200:
            json = {
                'login': str,
                'name': str,
                'surname': str,
                'role': int,
                'description': str,
            }


GET /api/users/<string:user_login>/avatar :
    Аватарка пользователя

    Возвращает:
        status 404:
            Не найдено
    ...


POST /api/users/<string:user_login>/avatar :
    Изменить аватарку пользователя

    Принимает:
        headers = {
            'email': str,  # Почта
            'password': str,  # Пароль
        }

    Возвращает:
        status 403:
            Нет доступа (неверный пароль или почта)

"""


from main import *
from users import *
from webrtc import *


if __name__ == "__main__":
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)
    # app.run(debug=True)
