import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutComponent } from './checkout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutCardComponent } from './components/checkout-card/checkout-card.component';

const routes: Routes = [
    {
        path: '',
        component: CheckoutComponent,
    },
];
@NgModule({
    declarations: [CheckoutComponent, CheckoutCardComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class CheckoutModule {}
