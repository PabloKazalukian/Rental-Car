// 🔹 Angular Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// 🔹 Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

// 🔹 NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { carReducer } from './store/cars/cars.reducers';
import { carEffects } from './store/cars/car.effects';

// 🔹 Routing
import { AppRoutingModule } from './app-routing.module';

// 🔹 App Root
import { AppComponent } from './app.component';

// 🔹 Pages
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AuthComponent } from './pages/auth/components/auth-layout/auth.component';
import { CallbackComponent } from './pages/auth/callback/callback.component';
import { CarsComponent } from './pages/cars/cars.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error/error404.component';
import { CarApplicationComponent } from './pages/request-car/car-application.component';
import { ModifyUserComponent } from './pages/user/modify-user/modify-user.component';

// 🔹 Components (dentro de páginas)
import { ShowCarComponent } from './pages/cars/components/show-car/show-car.component';
import { DialogLoggedComponent } from './pages/cars/components/show-car/dialog-logged/dialog-logged.component';
import { FilterCarsComponent } from './pages/cars/components/car-filter/filter-cars.component';
import { LandingPageComponent } from './pages/home/components/landing-page/landing-page.component';
import { HowToUseComponent } from './pages/home/components/how-to-use/how-to-use.component';
import { FormContactComponent } from './pages/contact/components/form-contact/form-contact.component';

// 🔹 Shared Components / Directives
import { NavBarComponent } from './shared/components/layout/navbar/navbar.component';
import { FooterComponent } from './shared/components/layout/footer/footer.component';
import { FormInputComponent } from './shared/components/ui/input/input.component';
import { FormButtonComponent } from './shared/components/ui/form-button/form-button.component';
import { ScrollAnimateDirective } from './shared/directives/scroll-animate.directive';
import { FormClassDirective } from './shared/directives/form-class.directive';
import { SharedModule } from './shared/shared.module';
import { TaxtareaComponent } from './shared/components/ui/taxtarea/taxtarea.component';

// 🔹 Interceptors
import { TokenInterceptor } from './core/interceptors/token.interceptor';

// 🔹 Environment
import { environment } from '../environments/environment';


@NgModule({
    declarations: [
        AppComponent,
        CarsComponent,
        ShowCarComponent,
        FilterCarsComponent,
        FooterComponent,
        NavBarComponent,
        ContactComponent,
        FormContactComponent,
        HomeComponent,
        Error404Component,
        LoginComponent,
        RegisterComponent,
        CarApplicationComponent,
        DialogLoggedComponent,
        LandingPageComponent,
        HowToUseComponent,
        ModifyUserComponent,
        FormClassDirective,
        AuthComponent,
        CallbackComponent,
        FormInputComponent,
        TaxtareaComponent,
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
        SharedModule,
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
