import {
    ApplicationRef,
    ComponentFactoryResolver,
    EmbeddedViewRef,
    Injectable,
    Injector,
    Type,
} from '@angular/core';
import { OverlayRef } from './overlay-ref';
import { OVERLAY_DATA, OVERLAY_REF } from './overlay.token';
import { OverlayComponent } from './overlay.component';
import { NavigationStart, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class OverlayService {
    private activeOverlays: OverlayRef[] = [];

    constructor(
        private appRef: ApplicationRef,
        private injector: Injector,
        private cfr: ComponentFactoryResolver,
        private router: Router
    ) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.closeAll(); // Cierre total al navegar
            }
        });
    }

    open<T>(component: Type<T>, data?: any): OverlayRef {

        const overlayRef = new OverlayRef(() => {
            this.appRef.detachView(overlayComponentRef.hostView);
            this.removeOverlay(overlayRef);
            overlayComponentRef.destroy();
        });

        const overlayInjector = Injector.create({
            providers: [
                { provide: OVERLAY_REF, useValue: overlayRef },
                { provide: OverlayRef, useExisting: OVERLAY_REF },
                { provide: OVERLAY_DATA, useValue: data },
            ],
            parent: this.injector,
        });

        const factory = this.cfr.resolveComponentFactory(OverlayComponent);
        const overlayComponentRef = factory.create(overlayInjector);
        this.appRef.attachView(overlayComponentRef.hostView);
        const domElem = (overlayComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];
        document.body.appendChild(domElem);

        this.activeOverlays.push(overlayRef);

        setTimeout(() => {
            const vcRef = overlayComponentRef.instance.vcRef;
            const contentFactory = this.cfr.resolveComponentFactory(component);
            vcRef.createComponent(contentFactory, undefined, overlayInjector);
        });

        return overlayRef;
    }

    private removeOverlay(ref: OverlayRef) {
        const index = this.activeOverlays.indexOf(ref);
        if (index !== -1) this.activeOverlays.splice(index, 1);
    }

    closeAll(): void {
        while (this.activeOverlays.length > 0) {
            this.activeOverlays.pop()?.close();
        }
    }
}
