import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastMessage } from 'src/app/core/models/notification.interface';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
    selector: 'app-container-toast',
    templateUrl: './container-toast.component.html',
    styleUrl: './container-toast.component.scss',
    standalone: true,
    imports: [ToastComponent],
})
export class ContainerToastComponent implements OnInit {
    toasts: ToastMessage[] = [];
    private subscriptions: Subscription[] = [];

    constructor(private notiService: NotificationService) {}

    ngOnInit() {
        this.subscriptions.push(
            this.notiService.messages$.subscribe((msg) => {
                this.toasts.push(msg);
                setTimeout(() => this.removeToast(0), 4000); // autodescarta el primero
            }),
        );
    }
    removeToast(index: number) {}

    finalRemoveToast(index: number) {
        this.toasts.splice(index, 1);
    }

    get visibleToasts() {
        return this.toasts.slice(0, 3);
    }

    get hiddenCount() {
        return this.toasts.length > 3 ? this.toasts.length - 3 : 0;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
