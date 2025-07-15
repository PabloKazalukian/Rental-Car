import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-message-error',
    templateUrl: './message-error.component.html',
    styleUrls: ['./message-error.component.css']
})
export class MessageErrorComponent implements OnInit {

    @Input() messageError: string = 'ocurrio un error';
    @Input() descriptionError: string = '';

    constructor() { }

    ngOnInit(): void {
    }

}
