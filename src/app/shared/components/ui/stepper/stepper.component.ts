import { Component, Input, OnChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TextLinkComponent } from '../text-link/text-link.component';
import { NgClass } from '@angular/common';

export interface DescriptionOfStep {
    text: string,
    routerLink?: string
}
export interface StepWithDescription {
    step: string,
    description?: DescriptionOfStep
}

@Component({
    selector: 'app-stepper',
    templateUrl: './stepper.component.html',
    styleUrls: ['./stepper.component.scss'],
    standalone: true,
    imports: [NgClass, TextLinkComponent, RouterLink]
})

export class StepperComponent implements OnChanges {

    @Input() steps: StepWithDescription[] = [];
    @Input() currentStep: number = 0;
    completedSteps: boolean[] = [];

    constructor() { }

    ngOnChanges() {
        this.completedSteps = this.steps.map((_, index) => index < this.currentStep);
    }

}

