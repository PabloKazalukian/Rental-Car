import { LoginComponent } from './pages/auth/login/login.component';
import { AuthComponent } from './pages/auth/components/auth-layout/auth.component';
import { CallbackComponent } from './pages/auth/callback/callback.component';
import { CarsComponent } from './pages/cars/cars.component';
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
import { carReducer } from './store/cars/cars.reducers';
import { carEffects } from './store/cars/car.effects';
import { ShowCarComponent } from './pages/cars/components/show-car/show-car.component';
import { FilterCarsComponent } from './pages/cars/components/car-filter/filter-cars.component';
import { FooterComponent } from './shared/components/layout/footer/footer.component';
import { NavBarComponent } from './shared/components/layout/navbar/navbar.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FormularioComponent } from './pages/contact/components/formulario/formulario.component';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error/error404.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CarApplicationComponent } from './pages/request-car/car-application.component';
import { DialogLoggedComponent } from './pages/cars/components/show-car/dialog-logged/dialog-logged.component';
import { LandingPageComponent } from './pages/home/components/landing-page/landing-page.component';
import { ModifyUserComponent } from './pages/user/modify-user/modify-user.component';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { HowToUseComponent } from './pages/home/components/how-to-use/how-to-use.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormClassDirective } from './shared/form-class.directive';
import { SharedModule } from './shared/shared.module';
import { FormInputComponent } from './shared/components/ui/form-input/form-input.component';
import { FormButtonComponent } from './shared/components/ui/form-button/form-button.component';
import { ScrollAnimateDirective } from './shared/scroll-animate.directive';


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
        // LoadingComponent,
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
        ScrollAnimateDirective,
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
