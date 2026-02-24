import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { delay, map, Subscription, switchMap, tap } from 'rxjs';
import { RequestToPayment } from 'src/app/core/models/request.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CheckoutService } from 'src/app/core/services/payment/checkout.service';
import { RentalService } from 'src/app/core/services/rental.service';
import { StepWithDescription } from 'src/app/shared/components/ui/stepper/stepper.component';
import { FormControlsOf } from 'src/app/shared/utils/form-types.util';
import { SelectComponent } from '../../shared/components/ui/select/select.component';
import { LoadingComponent } from '../../shared/components/ui/loading/loading.component';
import { RouterLink } from '@angular/router';
import { BtnComponent } from '../../shared/components/ui/btn/btn.component';
import { CheckoutCardComponent } from './components/checkout-card/checkout-card.component';
import { StepperComponent } from '../../shared/components/ui/stepper/stepper.component';
import { SkeletonComponent } from 'src/app/shared/components/ui/skeleton/skeleton.component';

interface Select {
    option: string;
}
type selectFormType = FormControlsOf<Select>;

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss',
    standalone: true,
    imports: [StepperComponent, CheckoutCardComponent, BtnComponent, RouterLink, LoadingComponent, SelectComponent, SkeletonComponent],
})
export class CheckoutComponent implements OnInit {
    private subscriptions: Subscription[] = [];
    user$ = this.authSvc._user$;

    selectForm!: FormGroup<selectFormType>;

    requestIds = signal<string[]>([]);
    request = signal<RequestToPayment[]>([]);

    loadingRequest = signal<boolean>(true);
    step = 1;
    stepsDescription: StepWithDescription[] = [
        { step: 'Agregado al carrito', description: { routerLink: '/usuario', text: 'Volver a tus alquileres' } },
        { step: 'Elegir metodo de pago' },
        { step: 'Confirmación de pago' },
    ];

    subtotal = 0;
    discount = 0;
    total = 0;

    options = [
        { name: 'Seleccionar metodo de pago', value: '' },
        { name: 'Mercado Pago', value: 'mercado_pago' },
    ];
    showSelected: 'Mercado Pago' | '' | '' = '';

    constructor(
        private checkoutSvc: CheckoutService,
        private authSvc: AuthService,
        private rentalSvc: RentalService,
    ) {}

    ngOnInit(): void {
        // this.checkoutSvc.getCheckoutApi()
        this.selectForm = this.initForm();

        this.subscriptions.push(
            this.selectControl.valueChanges.subscribe((newValue) => {
                if (newValue === 'mercado_pago') {
                    this.showSelected = 'Mercado Pago';
                    this.step = 2;
                } else {
                    this.showSelected = '';
                    this.step = 1;
                }
            }),
        );

        this.subscriptions.push(
            this.checkoutSvc._request$
                .pipe(
                    tap((res: string[]) => this.requestIds.set(res)),
                    switchMap((res: string[]) => this.rentalSvc.getRequestsByIds(res)),
                    delay(2000),
                )
                .subscribe({
                    next: (res: RequestToPayment[]) => {
                        this.request.set(res);
                        this.updateTotals();
                        this.loadingRequest.set(false);
                    },
                    error: (err) => {
                        console.log(err);
                        this.loadingRequest.set(false);
                    },
                }),
        );
    }

    initForm(): FormGroup<selectFormType> {
        return new FormGroup<selectFormType>({
            option: new FormControl('', { nonNullable: true }),
        });
    }

    updateTotals() {
        if (!this.request) return;
        this.subtotal = this.request().reduce((acc, r) => acc + r.amount, 0);
        this.discount = 0;
        this.total = this.subtotal - this.discount;
    }

    get selectControl(): FormControl<string> {
        return this.selectForm.get('option') as FormControl<string>;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
