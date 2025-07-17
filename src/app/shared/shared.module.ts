import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from 'src/app/shared/components/ui/success/success.component';
import { MessageErrorComponent } from 'src/app/shared/components/ui/message-error/message-error.component';
import { LoadingComponent } from 'src/app/shared/components/ui/loading/loading.component';
import { StepperComponent } from 'src/app/shared/components/ui/stepper/stepper.component';
import { TableComponent } from './components/ui/table/table.component';
import { RouterModule } from '@angular/router';
import { BtnComponent } from './components/ui/btn/btn.component';
import { MaterialModule } from './material.module';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ModalComponent } from './components/ui/modal/modal.component';
import { DialogComponent } from './components/ui/dialog/dialog.component';
import { AuthComponent } from './components/layout/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaxtareaComponent } from './components/ui/textarea/textarea.component';
import { FormInputComponent } from './components/ui/input/input.component';
import { ScrollAnimateDirective } from './directives/scroll-animate.directive';
import { ModalCarComponent } from '../pages/cars/components/show-car/modal-car/modal-car.component';
import { ShowCarComponent } from '../pages/cars/components/show-car/show-car.component';
import { FilterCarsComponent } from '../pages/cars/components/car-filter/filter-cars.component';
import { CarsComponent } from '../pages/cars/cars.component';


@NgModule({
    declarations: [
        SuccessComponent,
        MessageErrorComponent,
        LoadingComponent,
        StepperComponent,
        TableComponent,
        BtnComponent,
        ClickOutsideDirective,
        ModalComponent,
        DialogComponent,
        AuthComponent,
        TaxtareaComponent,
        FormInputComponent,
        ScrollAnimateDirective,
        CarsComponent,
        FilterCarsComponent,
        ShowCarComponent,
        ModalCarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule // Assuming you have a MaterialModule for Angular Material components
    ],
    exports: [
        SuccessComponent,
        MessageErrorComponent,
        LoadingComponent,
        StepperComponent,
        TableComponent,
        BtnComponent,
        ClickOutsideDirective,
        DialogComponent,
        AuthComponent,
        ModalComponent,
        TaxtareaComponent,
        FormInputComponent,
        CarsComponent,
        FilterCarsComponent,
        ShowCarComponent,
        ModalCarComponent,
        ScrollAnimateDirective,
        CarsComponent,
        FilterCarsComponent,
        ShowCarComponent,
        ModalCarComponent
    ]
})
export class SharedModule { }
