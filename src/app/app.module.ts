import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsComponent } from './components/cars/cars.component';
import { StoreModule } from '@ngrx/store';
import { carReducer} from './components/cars/cars.reducers'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowCarComponent } from './components/cars/show-car/show-car.component';
import { FilterCarsComponent } from './components/cars/filter-cars/filter-cars.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent} from './components/navbar/navbar.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormularioComponent } from './components/contact/formulario/formulario.component';
import { AlquilerComponent } from './components/alquiler/alquiler.component';
import { FormReactivoComponent } from './components/alquiler/form-reactivo/form-reactivo.component';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error404/error404.component';
import {HttpClientModule} from '@angular/common/http'
import {EffectsModule} from '@ngrx/effects';
import * as carSelector from './components/cars/car.selector';
import {carEffects} from './components/cars/car.effects';

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    ShowCarComponent,
    FilterCarsComponent,
    FooterComponent,
    NavBarComponent,
    ContactComponent,
    FormularioComponent,
    AlquilerComponent,
    FormReactivoComponent,
    HomeComponent,
    Error404Component,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({autos: carReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([carEffects]), //agregar Effects
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
