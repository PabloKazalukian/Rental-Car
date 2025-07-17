import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'registro', component: RegisterComponent },
]

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        CallbackComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AuthModule { }
