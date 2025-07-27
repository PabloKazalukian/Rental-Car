import { Component, Input, TemplateRef } from '@angular/core';


@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})


export class TableComponent {

    @Input() data: any[] = [];
    @Input() columns: { key: string; label: string, link?: (value: string) => string }[] = [];
    @Input() actionsTemplate?: TemplateRef<any>;

    getQueryParams(col: any, row: any): { [key: string]: string } {
        return { [col.key]: row[col.key] };
    };
    getValue(row: any, key: string): any {
        return key.split('.').reduce((acc, part) => acc?.[part], row);
    }
}
