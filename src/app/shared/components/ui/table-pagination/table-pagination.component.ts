import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-table-pagination',
    templateUrl: './table-pagination.component.html',
    styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnChanges {
    @Input() data: any[] = [];
    @Input() pageSizeOptions: number[] = [5, 10, 15];
    @Output() pageData = new EventEmitter<any[]>();

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
        this.currentPage = 0;
        this.updatePages();
        this.emitPageData();
    }

    goToPage(page: number) {
        this.currentPage = page;
        this.emitPageData();
    }
}

