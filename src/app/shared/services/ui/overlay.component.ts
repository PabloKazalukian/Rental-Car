import { Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'app-overlay',
    template: `<ng-template #vc></ng-template>`,
    styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent {
    @ViewChild('vc', { read: ViewContainerRef }) vcRef!: ViewContainerRef;
}


