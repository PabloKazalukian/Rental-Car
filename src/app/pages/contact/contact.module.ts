import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
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
    declarations: [
        ContactComponent,
        FormContactComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export class ContactModule { }
