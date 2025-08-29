// toast.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { toastAnimation } from 'src/app/shared/animations/toast.animation';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    animations: [toastAnimation], // se importará la animación reutilizable
})
export class ToastComponent {
    @Input() toast!: { id: number; text: string; type: string };
    @Output() closed = new EventEmitter<any>();

    close() {
        this.closed.emit('');
    }
}
