import { Component, Inject, Input, OnInit } from "@angular/core";
import { Car } from "src/app/core/models/car.interface";
import { OverlayRef } from "src/app/shared/services/ui/overlay-ref";
import { OVERLAY_DATA } from "src/app/shared/services/ui/overlay.token";

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

