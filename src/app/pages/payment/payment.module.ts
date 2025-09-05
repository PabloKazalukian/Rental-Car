import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentComponent } from './payment.component';
import { MercadoPagoComponent } from './components/mercadopago/mercadopago.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',

        component: MercadoPagoComponent,
    },
];

@NgModule({
    declarations: [PaymentComponent, MercadoPagoComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class PaymentModule {}
