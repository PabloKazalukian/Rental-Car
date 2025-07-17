// 🔹 Angular Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// 🔹 Angular Material Modules
import { MatCheckboxModule } from '@angular/material/checkbox';
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

// 🔹 Components (dentro de páginas)

// 🔹 Shared Components / Directives
import { FormClassDirective } from './shared/directives/form-class.directive';

// 🔹 Interceptors

// 🔹 Environment
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './shared/components/layout/footer/footer.component';
import { NavBarComponent } from './shared/components/layout/navbar/navbar.component';


@NgModule({
    declarations: [
        AppComponent,
        FormClassDirective,
        NavBarComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot({ autos: carReducer }),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 5 states
            logOnly: environment.production, // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        }),
        EffectsModule.forRoot([carEffects]), //agregar Effects
        HttpClientModule,
        BrowserAnimationsModule,
        // MatDialogModule,
        MatCheckboxModule,
        MatIconModule,
        CoreModule,
        SharedModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
