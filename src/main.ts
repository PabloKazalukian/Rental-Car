import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { CoreModule } from './app/core/core.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { carEffects } from './app/store/cars/car.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { carReducer } from './app/store/cars/cars.reducers';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, StoreModule.forRoot({ autos: carReducer }), environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 25 }), EffectsModule.forRoot([carEffects]), CoreModule),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
    ]
})
    .catch(err => console.error(err));
