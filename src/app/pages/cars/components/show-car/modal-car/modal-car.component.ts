import { Component, Input } from "@angular/core";
import { Car } from "src/app/core/models/car.interface";

@Component({
    selector: 'app-modal-car',
    templateUrl: './modal-car.component.html',
    styleUrls: ['./modal-car.component.scss']
})
export class ModalCarComponent {

    @Input() car!: Car

}

