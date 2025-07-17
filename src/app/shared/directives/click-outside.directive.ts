import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appClickOutside]'
})
export class ClickOutsideDirective {
    @Output() clickOutside = new EventEmitter<void>();

    constructor(private elementRef: ElementRef) { }

    @HostListener('document:click', ['$event.target'])
    onClick(target: HTMLElement): void {
        if (!this.elementRef.nativeElement.contains(target)) {
            this.clickOutside.emit();
        }
    }
}

