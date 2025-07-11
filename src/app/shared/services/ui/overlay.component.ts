import { Component, Inject, ViewChild, ViewContainerRef } from "@angular/core";
import { OverlayRef } from "./overlay-ref";
import { OVERLAY_REF } from "./overlay.token";

@Component({
  selector: 'app-overlay',
  template: `
    <div class="overlay-backdrop" (click)="onBackdropClick()">
      <div class="overlay-content" (click)="$event.stopPropagation()">
        <ng-template #vc></ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent {
/**
 * @ViewChild('vc'): busca un elemento del template que tenga #vc (template reference variable).
 * { read: ViewContainerRef }: en lugar de obtener el ElementRef, pide el ViewContainerRef, que es el punto de inserción dinámico de componentes.
 * vcRef!: ViewContainerRef: declara el campo vcRef como propiedad de clase, con notación de "definitivamente asignado" (!) porque Angular lo completa después.
 */
  @ViewChild('vc', { read: ViewContainerRef }) vcRef!: ViewContainerRef;

  constructor(@Inject(OVERLAY_REF) private overlayRef: OverlayRef) {}

  onBackdropClick(): void {
    this.overlayRef.close();
  }
}


