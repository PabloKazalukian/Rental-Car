import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from 'src/app/shared/components/ui/success/success.component';
import { MessageErrorComponent } from 'src/app/shared/components/ui/message-error/message-error.component';
import { LoadingComponent } from 'src/app/shared/components/ui/loading/loading.component';
import { StepperComponent } from 'src/app/shared/components/ui/stepper/stepper.component';
import { TableComponent } from './components/ui/table/table.component';
import { RouterModule } from '@angular/router';
import { BtnComponent } from './components/ui/btn/btn.component';
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
import { TextLinkComponent } from './components/ui/text-link/text-link.component';
import { CheckboxComponent } from './components/ui/checkbox/checkbox.component';
import { TablePaginationComponent } from './components/ui/table-pagination/table-pagination.component';
import { TableFilterComponent } from './components/ui/table-filter/table-filter.component';
import { SelectComponent } from './components/ui/select/select.component';
import { SkeletonComponent } from './components/ui/skeleton/skeleton.component';
import { ToastComponent } from './components/ui/toast/toast.component';
import { ContainerToastComponent } from './components/ui/container-toast/container-toast.component';

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
        ModalCarComponent,
        TextLinkComponent,
        CheckboxComponent,
        TablePaginationComponent,
        TableFilterComponent,
        SelectComponent,
        SkeletonComponent,
        ToastComponent,
        ContainerToastComponent,
    ],
    imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
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
        TextLinkComponent,
        ModalCarComponent,
        CheckboxComponent,
        TablePaginationComponent,
        TableFilterComponent,
        SelectComponent,
        SkeletonComponent,
        ToastComponent,
        ContainerToastComponent,
    ],
})
export class SharedModule {}
