import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsComponent } from './components/cars/cars.component';
import { StoreModule } from '@ngrx/store';
import { carReducer } from './components/cars/cars.reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowCarComponent } from './components/cars/show-car/show-car.component';
import { FilterCarsComponent } from './components/cars/filter-cars/filter-cars.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormularioComponent } from './components/contact/formulario/formulario.component';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error404/error404.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { carEffects } from './components/cars/car.effects';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TokenInterceptor } from './services/interceptor/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './components/loading/loading.component';
import { CarApplicationComponent } from './components/car-application/car-application.component';
import { DialogLoggedComponent } from './components/cars/show-car/dialog-logged/dialog-logged.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LandingPageComponent } from './components/home/landing-page/landing-page.component';
import { HowToUseComponent } from './components/home/how-to-use/how-to-use.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModifyUserComponent } from './components/user/modify-user/modify-user.component';

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
        HomeComponent,
        Error404Component,
        LoginComponent,
        RegisterComponent,
        LoadingComponent,
        CarApplicationComponent,
        DialogLoggedComponent,
        LandingPageComponent,
        HowToUseComponent,
        ModifyUserComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ autos: carReducer }),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 5 states
            logOnly: environment.production, // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        }),
        EffectsModule.forRoot([carEffects]), //agregar Effects
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatCheckboxModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
