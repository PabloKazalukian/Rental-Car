import { Component, Inject, OnInit } from "@angular/core";
import { Car } from "src/app/core/models/car.interface";
import { OverlayRef } from "src/app/shared/services/ui/overlay-ref";
import { OVERLAY_DATA } from "src/app/shared/services/ui/overlay.token";

@Component({
  selector: 'app-modal-car',
  templateUrl: './modal-car.component.html',
  styleUrls: ['./modal-car.component.css']
})
export class ModalCarComponent implements OnInit {
  constructor(
    @Inject(OVERLAY_DATA) public car: Car,
    private overlayRef: OverlayRef
  ) {}

  ngOnInit(): void {
      console.log('car', this.car)
  }
  cerrar(): void {
    this.overlayRef.close();
  }
}

