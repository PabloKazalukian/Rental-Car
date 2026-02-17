import { Component, Inject, Input, TemplateRef } from '@angular/core';
import { OverlayRef } from 'src/app/shared/services/ui/overlay-ref';
import { OVERLAY_DATA } from 'src/app/shared/services/ui/overlay.token';
import { BtnComponent } from '../btn/btn.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    standalone: true,
    imports: [NgTemplateOutlet, BtnComponent]
})
export class ModalComponent {
    @Input() title: string = '';
    @Input() subtitle?: string;
    @Input() logo: string = 'assets/logo.svg'; // Logo default
    @Input() showClose: boolean = true;

    constructor(
        @Inject(OVERLAY_DATA) public data: {
            title?: string;
            subtitle?: string;
            logo?: string;
            showClose?: boolean;
            content: TemplateRef<any>;
            actions?: TemplateRef<any>;
        },
        private overlayRef: OverlayRef
    ) { }

    close(): void {
        this.overlayRef.close();
    }
}

