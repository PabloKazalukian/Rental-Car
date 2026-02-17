import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarApplicationComponent } from '../request-car/car-application.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

    {
        path: '',
        component: CarApplicationComponent,
    },
]

@NgModule({
    imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CarApplicationComponent,
]
})
export class CarsModule { }
