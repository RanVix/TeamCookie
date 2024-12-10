from .general import *

cursor.execute("""CREATE TABLE IF NOT EXISTS users(
    id INT PRIMARY KEY AUTOINCREMENT,
    login VARCHAR(20) NOT NULL,
    email VARCHAR(256) NOT NULL,
    password_hash VARCHAR(100) NOT NULL
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    role INT NOT NULL DEFAULT 0,
    description VARCHAR(500) DEFAULT 'Нет описания');
""")  # (login, email, password_hash, name, surname, role, description) users
conn.commit()


class User:
    def __init__(self, data: tuple):
        ...

    def edit(self) -> None:
        ...


def get_user(login: str, email: str) -> Optional[User]:
    cursor.execute("SELECT * FROM users WHERE login=? AND email=?", (login, email))
    row = cursor.fetchone()
    if row:
        return User(row)


def save_user() -> None:
    ...
