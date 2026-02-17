import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactComponent } from './contact.component';
import { RouterModule, Routes } from '@angular/router';
import { FormContactComponent } from './components/form-contact/form-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [

    {
        path: '',
        component: ContactComponent,
    },
]


@NgModule({
    imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    ContactComponent,
    FormContactComponent
]
})
export class ContactModule { }
