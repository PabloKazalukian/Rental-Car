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

    getQueryParams(col: any, row: any): { [key: string]: string } {
        return { [col.key]: row[col.key] };
    };

    getValue(row: any, key: string): any {
        return key.split('.').reduce((acc, part) => acc?.[part], row);
    }

    orderBy(string: string): void {

        if (this.isAscending === null) {
            this.isAscending = true;
        } else {
            this.isAscending = !this.isAscending
        }

        this.sendOrder.emit({ column: string, isAscending: this.isAscending })
    }
}
