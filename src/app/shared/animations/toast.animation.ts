// animations.ts
import { trigger, style, animate, transition, state } from '@angular/animations';

export const toastAnimation = trigger('toastAnimation', [
    // Estado inicial (visible)
    state('open', style({ opacity: 1, transform: 'translateX(0) translateY(0)' })),

    // Estado de cierre (se desplaza hacia abajo + izquierda + fade out)
    state('closing', style({ opacity: 0, transform: 'translateX(40px) translateY(40px)' })),

    // Entrada: de derecha a izquierda con fade in
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
    ]),

    // Cambio a estado closing
    transition('open => closing', [animate('400ms ease-in')]),
]);
