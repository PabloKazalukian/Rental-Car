import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsGuard } from './core/guards/permissions.guard';

const routes: Routes = [
    // Redirección explícita desde '/'
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    // Página principal
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule) },

    // Otras rutas válidas
    { path: 'contacto', loadChildren: () => import('./pages/contact/contact.module').then((m) => m.ContactModule) },
    {
        path: 'alquiler',
        loadChildren: () => import('./pages/rental/rental.module').then((m) => m.RentalModule),
        canActivate: [PermissionsGuard],
    },
    { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule) },
    {
        path: 'usuario',
        loadChildren: () => import('./pages/user/user.module').then((m) => m.UserModule),
    },
    {
        path: 'solicitar-auto',
        loadChildren: () => import('./pages/cars/cars.module').then((m) => m.CarsModule),
    },
    { path: 'payment', loadChildren: () => import('./pages/payment/payment.module').then((m) => m.PaymentModule) },
    { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then((m) => m.CheckoutModule) },

    // Ruta comodín
    { path: '**', loadChildren: () => import('./pages/error/error.module').then((m) => m.ErrorModule) },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
