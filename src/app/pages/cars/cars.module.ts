import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarApplicationComponent } from '../request-car/car-application.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

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
    ]
})
export class CarsModule { }
