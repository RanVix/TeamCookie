import os
import bcrypt
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
        self.id = data[0]
        self.login = data[1]
        self.email = data[2]
        self.password_hash = data[3]
        self.name = data[4]
        self.surname = data[5]
        self.role = data[6]
        self.description = data[7]

        self.dict_data = {
            'id': self.id,
            'login': self.login,
            'name': self.name,
            'surname': self.surname,
            'role': self.role,
            'description': self.description,
        }

    def edit(self) -> None:
        ...


def get_user(login: str, email: str) -> Optional[User]:
    cursor.execute("SELECT * FROM users WHERE login=? AND email=?", (login, email))
    row = cursor.fetchone()
    if row:
        return User(row)


def check_password(password: str, hashed: bytes) -> bool:
    return bcrypt.checkpw(password.encode(), hashed)


def hash_password(password: str):
    salt = os.urandom(16)
    password_bytes = password.encode()
    hashed_password = hashlib.sha256(salt + password_bytes).hexdigest()
    return salt.hex() + hashed_password


def save_user(login: str, email: str, password: str, name: str, surname: str, role: int):
    password_hash = str(hash_password(password))
    password_hash = password_hash[2:]
    password_hash = password_hash[:-1]
    cursor.execute(
        "INSERT INTO users "
        "(login, email, password_hash, name, surname, role) "
        "VALUES(?, ?, ?, ?, ?, ?)",
        (login, email, password_hash, name, surname, role)
    )
    conn.commit()
    return get_user(login, email).dict_data

