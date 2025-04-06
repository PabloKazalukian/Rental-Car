import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {


    @Input() text: string = '';

    constructor() { }

    ngOnInit(): void {
    }

}
