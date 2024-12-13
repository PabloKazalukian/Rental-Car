import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: 'form'
})
export class FormClassDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.renderer.addClass(this.el.nativeElement, 'formulario');
        this.renderer.addClass(this.el.nativeElement, 'mt-3');
    }
}
