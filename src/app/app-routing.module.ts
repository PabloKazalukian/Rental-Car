import { WithoutSaveGuard } from './guard/without-save.guard';
import { PermissionsGuard } from './guard/permissions.guard';
import { Error404Component } from './components/error404/error404.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { AlquilerComponent } from './components/alquiler/alquiler.component';
import {HomeComponent} from './components/home/home.component';
import { DataResolverService } from './resolvers/data.resolver.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { CarApplicationComponent } from './components/car-application/car-application.component';
import { ModifyPassComponent } from './components/user/modify-pass/modify-pass.component';

const routes: Routes = [
  {path:'', redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'contacto', component:ContactComponent},
  {
    path:'alquiler' ,
    loadChildren:()=> import('./modules/rental/rental.module').then(m => m.RentalModule),
    canActivate:[PermissionsGuard],
    // canDeactivate:[WithoutSaveGuard],
    // resolve:{car:DataResolverService}
  },
  {path:'login', component:LoginComponent},
  {path:'registro', component:RegisterComponent},
  {
    path:'usuario',
      loadChildren:()=> import('./modules/user/user.module').then(m => m.UserModule),
  },
  {
    path:'solicitarAuto', component:CarApplicationComponent,
    canActivate:[PermissionsGuard],
  },
  {path:'**' , component:Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
