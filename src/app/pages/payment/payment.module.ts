import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentComponent } from './payment.component';
import { MercadoPagoComponent } from './components/mercadopago/mercadopago.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',

        component: MercadoPagoComponent,
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), PaymentComponent, MercadoPagoComponent],
})
export class PaymentModule {}
