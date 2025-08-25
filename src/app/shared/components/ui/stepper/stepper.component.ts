import { Component, Input, OnChanges } from '@angular/core';

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
    styleUrls: ['./stepper.component.scss']
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

