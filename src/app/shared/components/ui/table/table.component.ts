import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlsOf } from 'src/app/shared/utils/form-types.util';

interface FilterSearch { search: string };
type FilterRequestType = FormControlsOf<FilterSearch>;

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})


export class TableComponent implements OnInit, OnChanges {

    @Input() data: any[] = [];
    @Input() columns: { key: string; label: string, link?: (value: string) => string }[] = [];
    @Input() loading: boolean = false;
    @Input() pageSizeOptions: number[] = [5, 10, 15, 20];
    @Input() actionsTemplate?: TemplateRef<any>;

    filterRequest!: FormGroup<FilterRequestType>;


    currentPage: number = 0;
    pageSize: number = 5;
    filterValue: string = '';

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data']) {
            console.log('🟢 TableComponent received new data:', this.data);
        }
    }

    ngOnInit(): void {
        this.filterRequest = this.initForm();
    }

    initForm(): FormGroup<FilterRequestType> {
        return new FormGroup<FilterRequestType>({
            search: new FormControl('', { nonNullable: true })
        })
    }

    getQueryParams(col: any, row: any): { [key: string]: string } {
        return { [col.key]: row[col.key] };
    }

    get filteredData(): any[] {
        if (!this.filterValue.trim()) return this.data;
        const lowerFilter = this.filterValue.toLowerCase();
        return this.data.filter(row =>
            this.columns.some(col =>
                String(this.getValue(row, col.key)).toLowerCase().includes(lowerFilter)
            )
        );
    }

    get paginatedData(): any[] {
        const start = this.currentPage * this.pageSize;
        return this.filteredData.slice(start, start + this.pageSize);
    }

    get totalPagesArray(): number[] {
        return Array.from({ length: this.totalPages() }, (_, i) => i);
    }

    totalPages(): number {
        return Math.ceil(this.filteredData.length / this.pageSize);
    }

    changePageSize(size: number) {
        this.pageSize = size;
        this.currentPage = 0;
    }

    onPageSizeChange(event: Event) {
        const select = event.target as HTMLSelectElement;
        this.changePageSize(Number(select.value));
    }

    goToPage(page: number) {
        this.currentPage = page;
    }

    applyFilter(event: Event) {
        console.log(event)
        const input = event.target as HTMLInputElement;
        this.filterValue = input.value;
        this.currentPage = 0;
    }

    get filterControl(): FormControl<string> {
        return this.filterRequest.get('search') as FormControl<string>;
    }

    // 🔧 Para manejar claves anidadas como 'car_id.brand'
    getValue(row: any, key: string): any {
        return key.split('.').reduce((acc, part) => acc?.[part], row);
    }
}
