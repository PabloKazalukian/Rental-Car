import { Component, Input, OnInit } from '@angular/core';
import { delay, map, Subscription, switchMap } from 'rxjs';
import { RequestToPayment } from 'src/app/core/models/request.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CheckoutService } from 'src/app/core/services/payment/checkout.service';
import { toastAnimation } from 'src/app/shared/animations/toast.animation';
import { formatDateToLocale, getDays, getDaysDate } from 'src/app/shared/validators/date.validator';
import { BtnComponent } from '../../../../shared/components/ui/btn/btn.component';

@Component({
    selector: 'app-checkout-card',
    templateUrl: './checkout-card.component.html',
    styleUrl: './checkout-card.component.scss',
    animations: [toastAnimation],
    standalone: true,
    imports: [BtnComponent],
})
export class CheckoutCardComponent implements OnInit {
    private subscriptions: Subscription[] = [];

    @Input() request!: RequestToPayment;
    user$ = this.authSvc._user$;

    show = false;
    days!: number;

    constructor(
        private checkoutSvc: CheckoutService,
        private authSvc: AuthService,
    ) {}

    ngOnInit(): void {
        // console.log(this.request);
        if (this.request) {
            this.request.initialDate = formatDateToLocale(this.request.initialDate);
            this.request.finalDate = formatDateToLocale(this.request.finalDate);
            this.days = getDays(this.request.initialDate, this.request.finalDate) - 1;
        }
    }

    startClosing() {
        this.show = true; // activa transición open => closing
    }

    removeRequest(requestId: string) {
        this.startClosing();
        this.subscriptions.push(
            this.authSvc._user$
                .pipe(
                    map((user) => {
                        return this.checkoutSvc.removeOneRequestById(requestId, user.sub);
                    }),
                    delay(1000), // tiempo de la animación
                )
                .subscribe({
                    next: (check) => {
                        console.log('check', check);
                    },
                    error: (err) => {
                        console.log(err);
                    },
                }),
        );
    }

    onAnimationDone(event: any): void {
        // console.log(event);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
