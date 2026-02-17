import { Component, Input } from '@angular/core';
import { COLOR_VALUES } from 'src/app/shared/utils/color.type';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-btn',
    templateUrl: './btn.component.html',
    styleUrls: ['./btn.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        NgClass,
        CapitalizePipe,
    ],
})
export class BtnComponent {
    @Input() text: string = '';
    @Input() isDisabled: boolean = false;
    @Input() variant: 'basic' | 'raised' | 'stroked' | 'outline' | 'ghost' = 'basic';
    @Input() color: COLOR_VALUES = 'primary';
    @Input() routerLink?: string = '';
    @Input() buttonType: 'button' | 'submit' | 'reset' = 'button';

    get classList(): string[] {
        const classes = ['btn', this.variant, `text-${this.getTextColor()}`];

        switch (this.variant) {
            case 'basic':
                classes.push(`hover:bg-${this.color}`, 'hover:text-white');
                break;

            case 'raised':
                classes.push(`bg-${this.color}`, 'text-white', `hover:bg-${this.color}-hover`);
                break;

            case 'stroked':
                classes.push('border-surface', `hover:bg-${this.color}-hover-faint`);
                break;

            case 'outline':
                classes.push(`border-${this.color}`, `hover:bg-${this.color}-hover-faint`, 'hover:text-white');
                break;

            case 'ghost':
                classes.push('hover:bg-black-faint', 'hover:text-white');
                break;
        }

        return classes;
    }

    private getTextColor(): string {
        // Raised: texto blanco
        if (this.variant === 'raised') return 'white';
        return this.color;
    }
}
