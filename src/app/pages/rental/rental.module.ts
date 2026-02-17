import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentalComponent } from 'src/app/pages/rental/rental.component';
import { FormCarComponent } from 'src/app/pages/rental/components/form-car/form-car.component';
import { CalendarComponent } from 'src/app/pages/rental/components/calendar/calendar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CardCarComponent } from './components/card-car/card-car.component';
import { authGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: RentalComponent,
        canActivate: [authGuard],
    },
];

@NgModule({
    declarations: [RentalComponent, FormCarComponent, CalendarComponent, CardCarComponent],
    imports: [RouterModule.forChild(routes), FlatpickrModule.forRoot(), CommonModule, SharedModule, ReactiveFormsModule],
})
export class RentalModule {}
