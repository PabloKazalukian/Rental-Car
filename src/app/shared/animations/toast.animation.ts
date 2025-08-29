// animations.ts
import { trigger, style, animate, transition } from '@angular/animations';

export const toastAnimation = trigger('toastAnimation', [
    // Entrada: de derecha a izquierda con fade in
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
    ]),
    // Salida: de izquierda a derecha con fade out
    transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(100%)' })),
    ]),
]);
