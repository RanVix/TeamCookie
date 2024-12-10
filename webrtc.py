from main import *

rooms = {}

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    if room not in rooms:
        rooms[room] = set()
    if len(rooms[room]) >= 10:
        emit('room_full')
        return
    join_room(room)
    rooms[room].add(username)
    print(f"{username} joined room {room}")
    emit('user_joined', {'username': username, 'numUsers': len(rooms[room])}, room=room)
    for other_user in rooms[room]:
        if other_user != username:
            emit('initiate_call', {'target': other_user}, room=request.sid)


@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    rooms[room].remove(username)
    print(f"{username} left room {room}")
    emit('user_left', {'username': username, 'numUsers': len(rooms[room])}, room=room)
    if len(rooms[room]) == 0:
        del rooms[room]


@socketio.on('offer')
def on_offer(data):
    print(f"Relaying offer from {data['from']} to {data['target']}")
    emit('offer', data, room=data['target'])


@socketio.on('answer')
def on_answer(data):
    print(f"Relaying answer from {data['from']} to {data['target']}")
    emit('answer', data, room=data['target'])


@socketio.on('ice_candidate')
def on_ice_candidate(data):
    print(f"Relaying ICE candidate from {data['from']} to {data['target']}")
    emit('ice_candidate', data, room=data['target'])


