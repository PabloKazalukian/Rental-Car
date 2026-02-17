import { Component, Input } from "@angular/core";
import { NgClass, NgStyle } from "@angular/common";

@Component({
    selector: 'app-skeleton',
    templateUrl: './skeleton.component.html',
    styleUrls: ['./skeleton.component.scss'],
    standalone: true,
    imports: [NgClass, NgStyle]
})
export class SkeletonComponent {
    @Input() width: string = '100%';
    @Input() height: string = '1rem';
    @Input() variant: 'rectangular' | 'text' | 'circle' = 'rectangular';
    @Input() animation: 'wave' | 'pulse' | 'none' = 'wave';
    @Input() borderRadius: string = '4px';
}

