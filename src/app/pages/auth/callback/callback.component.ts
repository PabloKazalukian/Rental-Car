import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NotificationService } from 'src/app/core/services/notifications/notification.service';
import { MessageErrorComponent } from '../../../shared/components/ui/message-error/message-error.component';
import { SuccessComponent } from '../../../shared/components/ui/success/success.component';
import { LoadingComponent } from '../../../shared/components/ui/loading/loading.component';
import { AuthComponent } from '../../../shared/components/layout/auth/auth.component';

@Component({
    selector: 'app-callback',
    templateUrl: './callback.component.html',
    styleUrls: ['./callback.component.scss'],
    standalone: true,
    imports: [
        AuthComponent,
        LoadingComponent,
        SuccessComponent,
        MessageErrorComponent,
    ],
})
export class CallbackComponent implements OnInit {
    success: boolean = false;
    loading: boolean = true;

    constructor(
        private router: Router,
        private authSvc: AuthService,
        private notiSvc: NotificationService,
    ) {}

    ngOnInit(): void {
        this.authSvc.checkCookie().subscribe({
            next: (res: boolean) => {
                this.loading = false;
                if (res) {
                    this.success = true;
                    this.notiSvc.emit({ text: 'Login por google exitoso!', type: 'success' });
                    setTimeout(() => {
                        this.router.navigate(['/home']);
                    }, 2000);
                } else {
                    this.success = false;
                }
            },
            error(err: any): void {
                console.error('errorcin', err);
            },
        });
    }
}
