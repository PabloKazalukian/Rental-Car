import { Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {
    @Input() data: any[] = [];
    @Input() columns: { key: string; label: string, link?: (value: string) => string }[] = [];
    @Input() loading: boolean = false;
    @Input() pageSizeOptions: number[] = [5, 10, 15, 20];
    @Input() actionsTemplate?: TemplateRef<any>;

    currentPage: number = 0;
    pageSize: number = 5;
    filterValue: string = '';

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data']) {
            console.log('🟢 TableComponent received new data:', this.data);
        }
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
        const input = event.target as HTMLInputElement;
        this.filterValue = input.value;
        this.currentPage = 0;
    }

    // 🔧 Para manejar claves anidadas como 'car_id.brand'
    getValue(row: any, key: string): any {
        return key.split('.').reduce((acc, part) => acc?.[part], row);
    }
}
