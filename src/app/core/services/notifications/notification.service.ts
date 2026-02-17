import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastMessage } from '../../models/notification.interface';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private _messages = new Subject<{ text: string; type?: 'success' | 'error' }>();
    messages$ = this._messages.asObservable();
    constructor() {}

    emit(menssage: ToastMessage) {
        this._messages.next(menssage);
    }
}
