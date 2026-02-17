import { Component, Input } from '@angular/core';
import { COLOR_VALUES } from 'src/app/shared/utils/color.type';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    standalone: true,
    imports: [NgClass]
})
export class LoadingComponent {

    @Input() color: COLOR_VALUES = 'primary';

}
