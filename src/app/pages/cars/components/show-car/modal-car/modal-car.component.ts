import { Component, Input, OnInit } from "@angular/core";
import { Car } from "src/app/core/models/car.interface";

@Component({
    selector: 'app-modal-car',
    templateUrl: './modal-car.component.html',
    styleUrls: ['./modal-car.component.scss']
})
export class ModalCarComponent implements OnInit {

    @Input() car!: Car
    constructor(
    ) { }

    ngOnInit(): void {
    }
}

