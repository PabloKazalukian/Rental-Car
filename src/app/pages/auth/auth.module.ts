import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'registro', component: RegisterComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, FormsModule, ReactiveFormsModule, LoginComponent, RegisterComponent, CallbackComponent],
})
export class AuthModule {}
