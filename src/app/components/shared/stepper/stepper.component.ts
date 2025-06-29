import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
    selector: 'app-stepper',
    templateUrl: './stepper.component.html',
    styleUrls: ['./stepper.component.css']
})

export class StepperComponent implements OnInit, OnChanges {

    @Input() steps: string[] = [];
    @Input() currentStep: number = 0;
    completedSteps: boolean[] = [];

    constructor() { }

    ngOnInit(): void {
    }

    ngOnChanges() {
        this.completedSteps = this.steps.map((_, index) => index < this.currentStep);
    }

}

