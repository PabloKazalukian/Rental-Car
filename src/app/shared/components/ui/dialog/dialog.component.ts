import { Component, EventEmitter, Inject, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { OverlayRef } from 'src/app/shared/services/ui/overlay-ref';
import { OVERLAY_DATA } from 'src/app/shared/services/ui/overlay.token';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


    logo: string = 'assets/logo.svg'; // Logo default
    @Input() showClose: boolean = true;


    constructor(
        @Inject(OVERLAY_DATA) public data: {
            content: TemplateRef<any>,
            actions?: TemplateRef<any>,
            title?: string,
            data?: any,
        },
        private overlayRef: OverlayRef
    ) { }

    ngOnInit(): void {
        // Initialization logic if needed
    }
    close(result?: 'cancel' | 'confirm'): void {
        this.overlayRef.close(result);
    }

}

