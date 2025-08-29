import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastComponent } from 'src/app/shared/components/ui/toast/toast.component';
import { OverlayService } from 'src/app/shared/services/ui/overlay.service';
import { ToastMessage } from '../../models/notification.interface';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private _messages = new Subject<{ text: string; type?: 'success' | 'error' }>();
    messages$ = this._messages.asObservable();
    constructor(private overlayService: OverlayService) {}

    emit(menssage: ToastMessage) {
        console.log(menssage);
        this._messages.next(menssage);
    }

    // show(message: ToastMessage, time: number = 10000) {
    //     const ref = this.overlayService.open(ToastComponent, this._messages);
    //     setTimeout(() => ref.close(), time);
    //     return ref;
    // }
}
