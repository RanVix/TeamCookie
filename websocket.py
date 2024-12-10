from main import *


# WebRTC Signaling Server
@socketio.on('offer')
def handle_offer(data):
    """Обработка offer SDP"""
    emit('offer', data, broadcast=True)


@socketio.on('answer')
def handle_answer(data):
    """Обработка answer SDP"""
    emit('answer', data, broadcast=True)


@socketio.on('ice-candidate')
def handle_ice_candidate(data):
    """Обработка ICE-кандидатов"""
    emit('ice-candidate', data, broadcast=True)
