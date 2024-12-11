from .general import *

cursor.execute("""CREATE TABLE IF NOT EXISTS rooms(
    id INT PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    owner_id INTEGER NOT NULL,
    room_type INT NOT NULL,
    room_public INT NOT NULL,
    );
""")  # () rooms
conn.commit()

