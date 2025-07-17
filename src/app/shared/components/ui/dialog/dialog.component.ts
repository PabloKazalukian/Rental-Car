import { Component, EventEmitter, Inject, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { OverlayRef } from 'src/app/shared/services/ui/overlay-ref';
import { OVERLAY_DATA } from 'src/app/shared/services/ui/overlay.token';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

    @Input() title: string = '';
    @Input() subtitle?: string;
    @Input() logo: string = 'assets/logo.svg'; // Logo default
    @Input() showClose: boolean = true;


    constructor(
        @Inject(OVERLAY_DATA) public data: {
            content: TemplateRef<any>,
            actions?: TemplateRef<any>
        },
        private overlayRef: OverlayRef
    ) { }

    close(): void {
        this.overlayRef.close();
    }

}

