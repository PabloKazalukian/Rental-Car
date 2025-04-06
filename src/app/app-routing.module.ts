import { PermissionsGuard } from './guard/permissions.guard';
import { Error404Component } from './components/error404/error404.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CarApplicationComponent } from './components/car-application/car-application.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'contacto', component: ContactComponent },
    {
        path: 'alquiler',
        loadChildren: () => import('./modules/rental/rental.module').then(m => m.RentalModule),
        canActivate: [PermissionsGuard],
        // canDeactivate:[WithoutSaveGuard],
        // resolve:{car:DataResolverService}
    },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    {
        path: 'usuario',
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    },
    {
        path: 'solicitar-auto', component: CarApplicationComponent,
        canActivate: [PermissionsGuard],
    },
    { path: '**', component: Error404Component },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
