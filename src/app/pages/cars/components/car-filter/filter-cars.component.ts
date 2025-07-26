import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormControlsOf } from '../../../../shared/utils/form-types.util';

interface FilterSearch {
    model: string,
    brand: string
}

type FilterCarType = FormControlsOf<FilterSearch>



@Component({
    selector: 'app-filter-cars',
    templateUrl: './filter-cars.component.html',
    styleUrls: ['./filter-cars.component.scss']
})

export class FilterCarsComponent implements OnInit {
    filterCarForm!: FormGroup<FilterCarType>;
    btnSelected: string = '';

    @Input() orderPrice: any;
    @Input() orderBrand: any;
    @Input() orderYear: any;

    @Input() searchBrand!: string;
    @Input() searchModel!: string;

    @Output() newSearchEvent = new EventEmitter<FilterSearch>();
    @Output() newOrderEvent = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void {
        this.filterCarForm = this.initForm();

        // set default values if present
        if (this.searchModel || this.searchBrand) {
            this.textModelControl.setValue(this.searchModel || '');
            this.textBrandControl.setValue(this.searchBrand || '');
        }

        // opcional: emit automáticamente en cambios
        this.filterCarForm.valueChanges.subscribe(() => this.searchFilter());
    }

    initForm(): FormGroup<FilterCarType> {
        return new FormGroup<FilterCarType>({
            model: new FormControl('', { nonNullable: true }),
            brand: new FormControl('', { nonNullable: true })
        });
    }

    get textModelControl(): FormControl<string> {
        return this.filterCarForm.get('model')! as FormControl<string>;
    }

    get textBrandControl(): FormControl<string> {
        return this.filterCarForm.get('brand')! as FormControl<string>;
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
        this.filterCarForm.patchValue({
            brand: '',
            model: ''
        }); // limpia ambos
        this.order('');
        this.newSearchEvent.emit({ model: '', brand: '' });
    }
}


