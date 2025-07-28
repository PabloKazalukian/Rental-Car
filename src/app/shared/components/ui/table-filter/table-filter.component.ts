
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormControlsOf } from 'src/app/shared/utils/form-types.util';

interface FilterSearch { search: string };
type FilterRequestType = FormControlsOf<FilterSearch>;


@Component({
    selector: 'app-table-filter',
    templateUrl: './table-filter.component.html',
    styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit {

    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() data: any[] = [];
    @Input() columns: { key: string }[] = [];

    @Output() filteredData = new EventEmitter<any[]>();

    filterRequest!: FormGroup<FilterRequestType>;


    ngOnInit(): void {
        this.filterRequest = this.initForm();


        // Emit all initially
        this.filteredData.emit(this.data);
    }


    initForm(): FormGroup<FilterRequestType> {
        return new FormGroup<FilterRequestType>({
            search: new FormControl('', { nonNullable: true })
        })
    }

    applyFilter(event: Event) {
        const input = event.target as HTMLInputElement;
        const value = input.value.trim().toLowerCase();
        // this.filterValue = value;

        let result;
        if (!value) {
            this.filteredData.emit(this.data)
        } else {
            result = this.data.filter(row =>
                this.columns.some(col =>
                    String(this.getValue(row, col.key)).toLowerCase().includes(value)
                )
            );
            this.filteredData.emit(result);
        }
    }

    get filterControl(): FormControl<string> {
        return this.filterRequest.get('search') as FormControl<string>;
    }

    private getValue(row: any, key: string): any {
        return key.split('.').reduce((acc, part) => acc?.[part], row);
    }
}


