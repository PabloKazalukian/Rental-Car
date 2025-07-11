import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';

import { OverlayRef } from './overlay-ref';
import { OVERLAY_DATA, OVERLAY_REF } from './overlay.token';
import { OverlayConfig } from './overlay-config';
import { OverlayComponent } from './overlay.component';
import { NavigationStart, Router } from '@angular/router';

/**
 * Servicio central para la creación dinámica de Overlays (modales, diálogos, popups).
 *
 * Este servicio permite inyectar dinámicamente un componente dentro de un `OverlayComponent`,
 * que se agrega al DOM como una vista flotante. Se inyectan datos, referencias y bindings personalizados.
 *
 * @example
 * const overlay = overlayService.open(MyComponent, { data: { message: 'Hola!' } });
 * overlay.close(); // Para cerrarlo manualmente
 */
@Injectable({ providedIn: 'root' })
export class OverlayService {
    private activeOverlayRef: OverlayRef | null = null;

    /**
     * @param injector Inyector raíz del sistema. Se usa como padre para el inyector del overlay.
     * @param appRef Referencia a la aplicación para poder adjuntar o detachar vistas al DOM.
     * @param cfr (deprecated) Fábrica de componentes dinámica. Reemplazable por `vcRef.createComponent`.
     */
    constructor(
        private router: Router,
        private injector: Injector,
        private appRef: ApplicationRef,
        private cfr: ComponentFactoryResolver,
    ) {
        // 👂 Escucha navegación y cierra overlay si hay uno abierto
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart && this.activeOverlayRef) {
                this.activeOverlayRef.close();
                this.activeOverlayRef = null; // limpia la referencia
            }
        });
    }

    /**
     * Abre un overlay en pantalla con el componente dado.
     *
     * Crea un `OverlayComponent` contenedor, lo adjunta al DOM,
     * e inserta dentro el componente real (`component`) que representa el contenido del modal.
     *
     * @typeParam T Tipo del componente de contenido a renderizar.
     * @param component El tipo (clase) del componente que se mostrará en el overlay.
     * @param config (opcional) Configuración adicional, incluyendo `data` que se inyectará al componente.
     * @returns Una instancia de `OverlayRef` para controlar (cerrar, destruir) el overlay desde afuera.
     */
    open<T>(component: Type<T>, config?: OverlayConfig): OverlayRef {
        /**
         * Crea una referencia de Overlay personalizada, con lógica de limpieza cuando se cierra.
         */
        const overlayRef = new OverlayRef(() => {
            this.appRef.detachView(overlayComponentRef.hostView);
            overlayComponentRef.destroy();
            this.activeOverlayRef = null;
        });

        /**
         * Inyector personalizado para el overlay, inyecta:
         * - OVERLAY_REF: referencia pública al overlay (para cerrar desde adentro).
         * - OVERLAY_DATA: datos opcionales para pasar al componente de contenido.
         */
        const overlayInjector = Injector.create({
            providers: [
                { provide: OVERLAY_REF, useValue: overlayRef },
                { provide: OverlayRef, useExisting: OVERLAY_REF },
                { provide: OVERLAY_DATA, useValue: config?.data },
            ],
            parent: this.injector,
        });

        /**
         * Crea el OverlayComponent que será el contenedor visual del contenido.
         */
        const factory = this.cfr.resolveComponentFactory(OverlayComponent);
        const overlayComponentRef = factory.create(overlayInjector);

        /**
         * Adjunta el componente al árbol de vistas de Angular y al DOM real.
         */
        this.appRef.attachView(overlayComponentRef.hostView);
        const domElem = (overlayComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];
        document.body.appendChild(domElem);

        /**
         * Inserta el componente dinámico de contenido (el que se pasó como parámetro).
         *
         * Se hace en `setTimeout` para esperar a que el `vcRef` del overlay esté disponible.
         */
        setTimeout(() => {
            const vcRef = overlayComponentRef.instance.vcRef;
            const contentFactory = this.cfr.resolveComponentFactory(component);
            vcRef.createComponent(contentFactory, undefined, overlayInjector);
        });

        this.activeOverlayRef = overlayRef;

        return overlayRef;
    }
}
