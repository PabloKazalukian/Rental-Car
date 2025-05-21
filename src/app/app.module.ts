import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment'; // Angular CLI environment
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { carReducer } from './components/cars/cars.reducers';
import { carEffects } from './components/cars/car.effects';
import { CarsComponent } from './components/cars/cars.component';
import { ShowCarComponent } from './components/cars/show-car/show-car.component';
import { FilterCarsComponent } from './components/cars/filter-cars/filter-cars.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { ContactComponent } from './components/contact/contact.component';
import { FormularioComponent } from './components/contact/formulario/formulario.component';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error404/error404.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CarApplicationComponent } from './components/car-application/car-application.component';
import { DialogLoggedComponent } from './components/cars/show-car/dialog-logged/dialog-logged.component';
import { LandingPageComponent } from './components/home/landing-page/landing-page.component';
import { ModifyUserComponent } from './components/user/modify-user/modify-user.component';
import { TokenInterceptor } from './services/interceptor/token.interceptor';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { HowToUseComponent } from './components/home/how-to-use/how-to-use.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormClassDirective } from './shared/form-class.directive';
import { AuthComponent } from './components/auth/auth.component';
import { SharedModule } from './modules/shared/shared.module';
import { CallbackComponent } from './components/auth/callback/callback.component';
import { FormInputComponent } from './components/shared/form-input/form-input.component';
import { FormButtonComponent } from './components/shared/form-button/form-button.component';


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
        FormClassDirective,
        AuthComponent,
        CallbackComponent,
        FormInputComponent,
        FormButtonComponent,
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
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        SharedModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
