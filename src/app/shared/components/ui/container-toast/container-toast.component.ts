import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/core/services/notifications/toast.service';

@Component({
    selector: 'app-container-toast',
    templateUrl: './container-toast.component.html',
    styleUrl: './container-toast.component.scss',
})
export class ContainerToastComponent implements OnInit {
    toasts: any[] = [];

    constructor(private toastService: ToastService) {}

    ngOnInit() {
        this.toastService.messages$.subscribe((msg) => {
            this.toasts.push(msg);
        });
    }
}
