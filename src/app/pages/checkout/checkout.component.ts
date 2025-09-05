import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/core/services/payment/checkout.service';
import { RentalService } from 'src/app/core/services/rental.service';
import { StepWithDescription } from 'src/app/shared/components/ui/stepper/stepper.component';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
    request!: string[];
    step = 1;
    stepsDescription: StepWithDescription[] = [
        { step: 'Agregado al carrito', description: { text: 'Solicitar otro vehiculo' } },
        { step: 'Elegir metodo de pago' },
        { step: 'Confirmación de pago' },
    ];
    constructor(
        private checkoutSvc: CheckoutService,
        private rentalSvc: RentalService,
    ) {}

    ngOnInit(): void {
        this.request = this.checkoutSvc.getRequest();
        this.rentalSvc.getRequestsByIds(this.request).subscribe({
            next: (res) => {
                console.log(res);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
