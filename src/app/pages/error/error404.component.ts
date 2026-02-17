import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BtnComponent } from '../../shared/components/ui/btn/btn.component';

@Component({
    selector: 'app-error404',
    templateUrl: './error404.component.html',
    styleUrls: ['./error404.component.scss'],
    standalone: true,
    imports: [BtnComponent, RouterLink]
})
export class Error404Component {

}
