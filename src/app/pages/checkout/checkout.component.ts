import { Component, OnInit } from '@angular/core';
import { delay, map, Subscription, switchMap, tap } from 'rxjs';
import { RequestToPayment } from 'src/app/core/models/request.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CheckoutService } from 'src/app/core/services/payment/checkout.service';
import { RentalService } from 'src/app/core/services/rental.service';
import { StepWithDescription } from 'src/app/shared/components/ui/stepper/stepper.component';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
    private subscriptions: Subscription[] = [];
    user$ = this.authSvc._user$;

    requestIds!: string[];
    request!: RequestToPayment[];

    step = 1;
    stepsDescription: StepWithDescription[] = [
        { step: 'Agregado al carrito', description: { routerLink: '/usuario', text: 'Volver a tus alquileres' } },
        { step: 'Elegir metodo de pago' },
        { step: 'Confirmación de pago' },
    ];

    subtotal = 0;
    discount = 0;
    total = 0;

    constructor(
        private checkoutSvc: CheckoutService,
        private authSvc: AuthService,
        private rentalSvc: RentalService,
    ) {}

    ngOnInit(): void {
        // this.checkoutSvc.getCheckoutApi()
        this.subscriptions.push(
            this.user$
                .pipe(
                    map((user) => user.sub),
                    switchMap((idUser: string) => this.checkoutSvc.getCheckout(idUser)),
                )
                .subscribe({
                    next: (res: string[]) => {
                        this.requestIds = res;
                        console.log(this.requestIds);
                    },
                    error: (err) => {
                        console.log(err);
                    },
                }),
        );

        this.subscriptions.push(
            this.rentalSvc.getRequestsByIds(this.requestIds).subscribe({
                next: (res: RequestToPayment[]) => {
                    this.request = res;
                    this.updateTotals();
                },
                error: (err) => {
                    console.log(err);
                },
            }),
        );
    }

    updateTotals() {
        if (!this.request) return;
        this.subtotal = this.request.reduce((acc, r) => acc + r.amount, 0);
        this.discount = 0;
        this.total = this.subtotal - this.discount;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
