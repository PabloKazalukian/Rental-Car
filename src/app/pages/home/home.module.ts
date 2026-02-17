import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HowToUseComponent } from './components/how-to-use/how-to-use.component';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { CarsModule } from '../cars/cars.module';

const routes: Routes = [
    { path: '', component: HomeComponent }
];



@NgModule({
    imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HomeComponent,
    LandingPageComponent,
    HowToUseComponent,
]
})
export class HomeModule { }
