import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormControlsOf } from 'src/app/shared/utils/form-types.util';
import { SelectType, SelectComponent } from '../select/select.component';

interface FilterSearch { option: string };
type selectFormType = FormControlsOf<FilterSearch>;

@Component({
    selector: 'app-table-pagination',
    templateUrl: './table-pagination.component.html',
    styleUrls: ['./table-pagination.component.scss'],
    standalone: true,
    imports: [SelectComponent]
})
export class TablePaginationComponent implements OnChanges, OnInit {
    @Input() data: any[] = [];
    @Input() pageSizeOptions: number[] = [5, 10, 15];
    @Output() pageData = new EventEmitter<any[]>();
    @Output() pageSizeChange = new EventEmitter<any>();

    selectForm!: FormGroup<selectFormType>;


    options: SelectType[] = [];

    currentPage = 0;
    pageSize = 5;
    pages: number[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data']) {
            this.currentPage = 0;
            this.updatePages();
            this.emitPageData();
        }
    }

    ngOnInit(): void {
        this.selectForm = this.initForm();

        this.options = this.pageSizeOptions.map((page): SelectType => { return { name: page.toString(), value: page } });

        this.selectControl.valueChanges.subscribe((newValue) => {
            // Por ejemplo, si el valor es un número y lo usás como nuevo pageSize:
            this.pageSize = Number(newValue);
            this.pageSizeChange.emit(this.pageSize);

            this.currentPage = 0;
            this.updatePages();
            this.emitPageData();
        });
    }

    initForm(): FormGroup<selectFormType> {
        return new FormGroup<selectFormType>({
            option: new FormControl('', { nonNullable: true })
        })
    }

    updatePages() {
        const totalPages = Math.ceil(this.data.length / this.pageSize);
        this.pages = Array.from({ length: totalPages }, (_, i) => i);
    }

    emitPageData() {
        const start = this.currentPage * this.pageSize;
        const end = start + this.pageSize;
        this.pageData.emit(this.data.slice(start, end));
    }

    onPageSizeChange(event: Event) {
        this.pageSize = Number((event.target as HTMLSelectElement).value);
        this.pageSizeChange.emit(this.pageSize);
        this.currentPage = 0;
        this.updatePages();
        this.emitPageData();
    }

    goToPage(page: number) {
        this.currentPage = page;
        this.emitPageData();
    }

    get selectControl(): FormControl<string> {
        return this.selectForm.get('option') as FormControl<string>;
    }
}

