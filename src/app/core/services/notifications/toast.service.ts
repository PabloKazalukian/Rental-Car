import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastComponent } from 'src/app/shared/components/ui/toast/toast.component';
import { OverlayService } from 'src/app/shared/services/ui/overlay.service';

@Injectable({ providedIn: 'root' })
export class ToastService {
    private _messages = new Subject<{ text: string; type?: 'success' | 'error' }>();
    messages$ = this._messages.asObservable();
    constructor(private overlayService: OverlayService) {}

    emit(text: string, type: 'success' | 'error' = 'success') {
        this._messages.next({ text, type });
    }

    show(message: string, time: number = 1000000) {
        const ref = this.overlayService.open(ToastComponent, this._messages);
        setTimeout(() => ref.close(), time);
        return ref;
    }
}
