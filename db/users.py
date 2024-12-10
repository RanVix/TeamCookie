import os
import bcrypt
from .general import *

cursor.execute("""CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login VARCHAR(20) NOT NULL,
    email VARCHAR(256) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    role INT NOT NULL DEFAULT 0,
    description VARCHAR(500) DEFAULT 'Нет описания');
""")  # (login, email, password_hash, name, surname, role, description) users
conn.commit()


class User:
    def __init__(self, data: tuple):
        self.id = data[0]
        self.login = data[1]
        self.email = data[2]
        self.password_hash = data[3]
        self.name = data[4]
        self.surname = data[5]
        self.role = data[6]
        self.description = data[7]

    @property
    def public_data(self):
        return {
            'login': self.login,
            'name': self.name,
            'surname': self.surname,
            'role': self.role,
            'description': self.description,
        }

    def edit(self, name: str, surname: str, role: int, description: str) -> None:
        self.name = name
        self.surname = surname
        self.role = role
        self.description = description
        cursor.execute(
            f"UPDATE users SET name=?, surname=?, role=?, description=? WHERE id={self.id}",
            (name, surname, role, description)
        )
        conn.commit()


def check_user(email: str, password: str):
    cursor.execute("SELECT login, password_hash FROM users WHERE email=?", (email,))
    row = cursor.fetchone()
    if not row:
        return None
    login, hash = row
    if not bcrypt.checkpw(password.encode(), bytes(hash.encode())):
        return None
    return get_user(login)


def get_user(login: str, email: Optional[str] = None) -> Optional[User]:
    if email:
        cursor.execute("SELECT * FROM users WHERE login=? AND email=?", (login, email))
    else:
        cursor.execute("SELECT * FROM users WHERE login=?", (login,))
    row = cursor.fetchone()
    if row:
        return User(row)


def check_password(password: str, hashed: bytes) -> bool:
    return bcrypt.checkpw(password.encode(), hashed)


def hash_password(password: str) -> bytes:
    # Генерация соли и хеширование пароля
    salt = bcrypt.gensalt()  # Генерируем соль
    hashed = bcrypt.hashpw(password.encode(), salt)
    return hashed


def save_user(login: str, email: str, password: str, name: str, surname: str, role: int):
    password_hash = str(hash_password(password))
    password_hash = password_hash[2:]
    password_hash = password_hash[:-1]
    cursor.execute(
        "INSERT INTO users "
        "(login, email, password_hash, name, surname, role) "
        "VALUES(?, ?, ?, ?, ?, ?)",
        (login[:20], email[:256], password_hash, name[:100], surname[:100], role)
    )
    conn.commit()
    return get_user(login, email).public_data
