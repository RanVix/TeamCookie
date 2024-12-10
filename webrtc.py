from main import *


@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    emit('user_joined', {'username': username}, room=room)


@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    emit('user_left', {'username': username}, room=room)


@socketio.on('offer')
def on_offer(data):
    emit('offer', data, room=data['target'])


@socketio.on('answer')
def on_answer(data):
    emit('answer', data, room=data['target'])


@socketio.on('ice_candidate')
def on_ice_candidate(data):
    emit('ice_candidate', data, room=data['target'])


# @socketio.on('offer')
# def handle_offer(offer):
#     emit('offer', offer, broadcast=True, include_self=False)
#
#
# @socketio.on('answer')
# def handle_answer(answer):
#     emit('answer', answer, broadcast=True, include_self=False)
#
#
# @socketio.on('ice_candidate')
# def handle_ice_candidate(ice_candidate):
#     emit('ice_candidate', ice_candidate, broadcast=True, include_self=False)


# # WebRTC Signaling Server
# @socketio.on('offer')
# def handle_offer(data):
#     """Обработка offer SDP"""
#     emit('offer', data, broadcast=True)
#
#
# @socketio.on('answer')
# def handle_answer(data):
#     """Обработка answer SDP"""
#     emit('answer', data, broadcast=True)
#
#
# @socketio.on('ice-candidate')
# def handle_ice_candidate(data):
#     """Обработка ICE-кандидатов"""
#     emit('ice-candidate', data, broadcast=True)
