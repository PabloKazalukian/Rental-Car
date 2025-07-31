import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'app-stepper',
    templateUrl: './stepper.component.html',
    styleUrls: ['./stepper.component.css']
})

export class StepperComponent implements OnChanges {

    @Input() steps: string[] = [];
    @Input() currentStep: number = 0;
    completedSteps: boolean[] = [];

    constructor() { }

    ngOnChanges() {
        this.completedSteps = this.steps.map((_, index) => index < this.currentStep);
    }

}

