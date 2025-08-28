import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SocketService {
    private socket: Socket;

    constructor() {
        this.socket = io(`${environment.socket}`, {
            path: '/socket.io', // ruta por defecto, puede cambiarse
            transports: ['websocket'], // opcional: fuerza WebSocket puro
        }); // ✅ This works

        this.socket.on('connect', () => {
            console.log('Conectado con id:', 'prueba');
        });

        console.log('ásta');
        this.socket.emit('message', 'seg');
    }

    sendMessage(message: string) {
        this.socket.emit('message', message); // ✅ emit is available
    }

    listenMessage(callback: (msg: string) => void) {
        this.socket.on('message', callback); // ✅ on is available
    }
}
