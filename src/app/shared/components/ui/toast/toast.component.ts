// toast.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastMessage } from 'src/app/core/models/notification.interface';
import { toastAnimation } from 'src/app/shared/animations/toast.animation';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    animations: [toastAnimation],
    standalone: true,
    imports: [NgClass],
})
export class ToastComponent implements OnInit {
    @Input() toast!: ToastMessage;
    @Output() afterClosed = new EventEmitter<number>();

    closing = false;

    ngOnInit() {
        setTimeout(() => this.startClosing(), 4000);
    }

    startClosing() {
        this.closing = true; // activa transición open => closing
    }

    onAnimationDone(event: any): void {
        if (event.toState === 'closing') {
            this.afterClosed.emit(this.toast?.id); // avisa al contenedor que ya puede hacer splice
        }
    }
}
