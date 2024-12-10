# Документация
Основная ссылка: http://127.0.0.1:5000

**POST** `/api/register` - Регистрация

<details>
<summary> <b>POST</b> <code>/api/login</code> - Вход </summary>
##### headers

| Название | Тип    | Описание |
|----------|--------|----------|
| email    | string | Почта    |
| password | string | Пароль   |

</details>

**GET** `/api/users/<string:user_login>` - Информация о пользователе

**PUT** `/api/users/<string:user_login>` - Изменить пользователя

**GET** `/api/users/<string:user_login>/avatar` - Аватарка пользователя

**POST** `/api/users/<string:user_login>/avatar` - Изменить аватарку пользователя
