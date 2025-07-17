import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Car } from 'src/app/core/models/car.interface';
import { Store, select } from '@ngrx/store';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';


interface appState {
    loading: boolean,
    cars: Array<Car>
    car: Array<Car>
}

interface text {
    model: string | '',
    brand: string | ''
}


@Component({
    selector: 'app-filter-cars',
    templateUrl: './filter-cars.component.html',
    styleUrls: ['./filter-cars.component.css']
})

export class FilterCarsComponent implements OnInit {
    registerForm!: UntypedFormGroup;
    btnSelected: string = '';

    @Input() orderPrice: any;
    @Input() orderBrand: any;
    @Input() orderYear: any;

    @Input() searchBrand!: string;
    @Input() searchModel!: string;

    @Output() newSearchEvent = new EventEmitter<text>();
    @Output() newOrderEvent = new EventEmitter<string>();

    constructor(private readonly fb: UntypedFormBuilder, private store: Store<{ autos: appState }>) {}

    ngOnInit(): void {
        this.registerForm = this.initForm();

        // set default values if present
        if (this.searchModel || this.searchBrand) {
            this.textModelControl.setValue(this.searchModel || '');
            this.textBrandControl.setValue(this.searchBrand || '');
        }

        // opcional: emit automáticamente en cambios
        this.registerForm.valueChanges.subscribe(() => this.searchFilter());
    }

    initForm(): UntypedFormGroup {
        return this.fb.group({
            model: [''],
            brand: ['']
        });
    }

    get textModelControl(): UntypedFormControl {
        return this.registerForm.get('model') as UntypedFormControl;
    }

    get textBrandControl(): UntypedFormControl {
        return this.registerForm.get('brand') as UntypedFormControl;
    }

    public searchFilter(): void {
        const model = this.textModelControl.value || '';
        const brand = this.textBrandControl.value || '';
        this.newSearchEvent.emit({ model, brand });
    }

    public order(order: string): void {
        this.btnSelected = order;
        this.newOrderEvent.emit(order);
    }

    public reset(): void {
        this.registerForm.reset(); // limpia ambos
        this.order('');
        this.newSearchEvent.emit({ model: '', brand: '' });
    }
}


