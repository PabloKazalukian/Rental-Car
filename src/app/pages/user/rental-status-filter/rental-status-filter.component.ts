import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectType } from 'src/app/shared/components/ui/select/select.component';
import { FormControlsOf } from 'src/app/shared/utils/form-types.util';
import { SelectComponent } from '../../../shared/components/ui/select/select.component';


interface FilterSearch { option: string };
type SelectFormType = FormControlsOf<FilterSearch>;

@Component({
    selector: 'app-rental-status-filter',
    templateUrl: './rental-status-filter.component.html',
    styleUrls: ['./rental-status-filter.component.scss'],
    standalone: true,
    imports: [SelectComponent]
})
export class RentalStatusFilterComponent implements OnInit {

    statusForm!: FormGroup<SelectFormType>;

    options: SelectType[] = []

    @Output() statusSelected = new EventEmitter<string | null>();

    states: SelectType[] = [
        { name: "Todos", value: '' },
        { name: "Confirmación", value: 'con' },
        { name: "Por Confirmar", value: 'req' },
        { name: "Cancelado", value: 'can' },
        { name: "Sin cancelados", value: '!can' }];


    ngOnInit(): void {
        this.statusForm = this.initForm();

        this.statusForm.valueChanges.subscribe((e) => {
            const { option } = e;
            if (option) this.emitSelected(option)
            else this.emitSelected('')
        });
    };

    initForm(): FormGroup<SelectFormType> {
        return new FormGroup<SelectFormType>({
            option: new FormControl('', { nonNullable: true })
        })
    }

    emitSelected(value: string) {
        this.statusSelected.emit(value);
    }

    get selectControl(): FormControl<string> {
        return this.statusForm.get('option') as FormControl<string>;
    }
}
