import { Component, Input, OnInit } from '@angular/core';
import { RequestToPayment } from 'src/app/core/models/request.interface';
import { CheckoutService } from 'src/app/core/services/payment/checkout.service';
import { toastAnimation } from 'src/app/shared/animations/toast.animation';
import { formatDateToLocale, getDays, getDaysDate } from 'src/app/shared/validators/date.validator';

@Component({
    selector: 'app-checkout-card',
    templateUrl: './checkout-card.component.html',
    styleUrl: './checkout-card.component.scss',
    animations: [toastAnimation],
})
export class CheckoutCardComponent implements OnInit {
    @Input() request!: RequestToPayment;
    show = false;
    days!: number;

    constructor(private checkoutSvc: CheckoutService) {}

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
        setTimeout(() => this.checkoutSvc.removeRequest(requestId), 1000);
    }

    onAnimationDone(event: any): void {
        console.log(event);
    }
}
