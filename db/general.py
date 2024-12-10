from sqlite3 import connect
from typing import Optional

conn = connect('Database.db', check_same_thread=False)
cursor = conn.cursor()
