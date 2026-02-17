import { Component, OnInit } from '@angular/core';
import { FormContactComponent } from './components/form-contact/form-contact.component';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: true,
    imports: [FormContactComponent]
})
export class ContactComponent implements OnInit {

    success: boolean = false;
    sendEmail: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

}
