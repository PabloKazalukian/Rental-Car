import { Component, Inject, Input, TemplateRef } from '@angular/core';
import { OverlayRef } from 'src/app/shared/services/ui/overlay-ref';
import { OVERLAY_DATA } from 'src/app/shared/services/ui/overlay.token';
import { BtnComponent } from '../btn/btn.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    standalone: true,
    imports: [NgTemplateOutlet, BtnComponent]
})
export class DialogComponent {


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
    close(result?: 'cancel' | 'confirm'): void {
        this.overlayRef.close(result);
    }

}

