import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { Error404Component } from './error404.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

    {
        path: '',
        component: Error404Component,
    },
]

@NgModule({
    declarations: [
        Error404Component,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class ErrorModule { }
