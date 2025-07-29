import { Component, Input, Output, TemplateRef, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})


export class TableComponent {

    @Input() data: any[] = [];
    @Input() columns: { key: string; label: string, link?: (value: string) => string }[] = [];
    @Input() actionsTemplate?: TemplateRef<any>;

    @Output() sendOrder = new EventEmitter();

    isAscending!: boolean;
    sortedColumn: string | null = null;


    getQueryParams(col: any, row: any): { [key: string]: string } {
        return { [col.key]: row[col.key] };
    };

    getValue(row: any, key: string): any {
        return key.split('.').reduce((acc, part) => acc?.[part], row);
    }


    orderBy(columnKey: string): void {
        if (this.sortedColumn === columnKey) {
            this.isAscending = !this.isAscending;
        } else {
            this.sortedColumn = columnKey;
            this.isAscending = true;
        }

        this.sendOrder.emit({
            column: this.sortedColumn,
            isAscending: this.isAscending
        });
    }

    isColumnSorted(colKey: string): boolean {
        return this.sortedColumn === colKey;
    }

    getSortIcon(colKey: string): string {
        if (this.sortedColumn !== colKey) return '↕'; // flechas grises por defecto
        return this.isAscending ? '↑' : '↓';
    }

}
