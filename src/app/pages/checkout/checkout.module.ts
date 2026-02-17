import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutComponent } from './checkout.component';

import { RouterModule, Routes } from '@angular/router';
import { CheckoutCardComponent } from './components/checkout-card/checkout-card.component';
import { authGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: CheckoutComponent,
        canActivate: [authGuard],
    },
];
@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), CheckoutComponent, CheckoutCardComponent],
})
export class CheckoutModule {}
