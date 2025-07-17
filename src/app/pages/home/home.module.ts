import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HowToUseComponent } from './components/how-to-use/how-to-use.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CarsModule } from '../cars/cars.module';

const routes: Routes = [
    { path: '', component: HomeComponent }
];



@NgModule({
    declarations: [
        HomeComponent,
        LandingPageComponent,
        HowToUseComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule,
    ]
})
export class HomeModule { }
