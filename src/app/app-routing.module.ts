import { PermissionsGuard } from './core/guard/permissions.guard';
import { Error404Component } from './pages/error/error404.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CarApplicationComponent } from './pages/request-car/car-application.component';
import { CallbackComponent } from './pages/auth/callback/callback.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'contacto', component: ContactComponent },
    {
        path: 'alquiler',
        loadChildren: () => import('./pages/rental/rental.module').then(m => m.RentalModule),
        canActivate: [PermissionsGuard],
        // canDeactivate:[WithoutSaveGuard],
        // resolve:{car:DataResolverService}
    },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/callback', component: CallbackComponent },
    { path: 'auth/registro', component: RegisterComponent },
    {
        path: 'usuario',
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
    },
    {
        path: 'solicitar-auto', component: CarApplicationComponent,
        canActivate: [PermissionsGuard],
    },
    { path: '**', component: Error404Component },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
