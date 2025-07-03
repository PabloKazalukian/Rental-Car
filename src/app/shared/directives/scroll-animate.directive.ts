import { Directive, ElementRef, HostBinding, OnInit } from '@angular/core';

@Directive({
    selector: '[appScrollAnimate]'
})
export class ScrollAnimateDirective implements OnInit {
    @HostBinding('class.animate') isVisible = false;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isVisible = true;
                    observer.unobserve(this.el.nativeElement);
                }
            });
        });

        observer.observe(this.el.nativeElement);
    }
}
