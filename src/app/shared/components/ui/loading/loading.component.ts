import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

    @Input() color: 'primary' | 'secondary' | 'accent' | 'error' | 'success' | 'surface' | 'confirm' = 'primary';

    constructor() { }

    ngOnInit(): void {
    }

}
