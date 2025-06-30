import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-form-button',
    template: `
    <button mat-raised-button [color]="color" [disabled]="disabled" type="submit">
      {{ text }}
    </button>
  `,
})
export class FormButtonComponent {
    @Input() text: string = 'Enviar';
    @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
    @Input() disabled: boolean = false;
}

