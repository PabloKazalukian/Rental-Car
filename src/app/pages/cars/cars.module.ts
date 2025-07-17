import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCarsComponent } from './components/car-filter/filter-cars.component';
import { ShowCarComponent } from './components/show-car/show-car.component';
import { CarApplicationComponent } from '../request-car/car-application.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
// import { CarsComponent } from './cars.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalCarComponent } from './components/show-car/modal-car/modal-car.component';
import { CarsComponent } from './cars.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [

    {
        path: '',
        component: CarApplicationComponent,
    },
]

@NgModule({
    declarations: [

        CarApplicationComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        MatDialogModule,
    ]
})
export class CarsModule { }
