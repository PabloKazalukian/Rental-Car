import { Component, OnInit } from '@angular/core';
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

interface Select {
    option: string;
}
type selectFormType = FormControlsOf<Select>;

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss',
    standalone: true,
    imports: [
        StepperComponent,
        CheckoutCardComponent,
        BtnComponent,
        RouterLink,
        LoadingComponent,
        SelectComponent,
    ],
})
export class CheckoutComponent implements OnInit {
    private subscriptions: Subscription[] = [];
    user$ = this.authSvc._user$;

    selectForm!: FormGroup<selectFormType>;

    requestIds!: string[];
    request: RequestToPayment[] = [];

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

        // this.subscriptions.push(
        //     this.user$
        //         .pipe(
        //             map((user) => user.sub),
        //             switchMap((idUser: string) => this.checkoutSvc.getCheckout(idUser)),
        //         )
        //         .subscribe({
        //             next: (res: string[]) => {
        //                 // this.requestIds = res;
        //             },
        //             error: (err) => {
        //                 console.log(err);
        //             },
        //         }),
        // );

        this.subscriptions.push(
            this.checkoutSvc._request$
                .pipe(
                    tap((res: string[]) => (this.requestIds = res)),
                    switchMap((res: string[]) => this.rentalSvc.getRequestsByIds(res)),
                )
                .subscribe({
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

    initForm(): FormGroup<selectFormType> {
        return new FormGroup<selectFormType>({
            option: new FormControl('', { nonNullable: true }),
        });
    }

    updateTotals() {
        if (!this.request) return;
        this.subtotal = this.request.reduce((acc, r) => acc + r.amount, 0);
        this.discount = 0;
        this.total = this.subtotal - this.discount;
    }

    get selectControl(): FormControl<string> {
        return this.selectForm.get('option') as FormControl<string>;
    }

    ngOnDestroy(): void {
        // console.log('destruyendo checkout');
        // const userId = this.authSvc._user$
        //     .pipe(
        //         map((user) => user.sub),
        //         switchMap((userId) => this.checkoutSvc.syncApiCheckout(userId)),
        //     )
        //     .subscribe({
        //         next: () => console.log('Carrito sincronizado al salir'),
        //         error: (err) => console.error('Error al sincronizar', err),
        //     });

        // userId.unsubscribe();
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
}
