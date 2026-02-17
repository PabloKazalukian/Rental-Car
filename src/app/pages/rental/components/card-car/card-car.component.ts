import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/core/models/car.interface';
import { RouterLink } from '@angular/router';
import { BtnComponent } from '../../../../shared/components/ui/btn/btn.component';

@Component({
    selector: 'app-card-car',
    templateUrl: './card-car.component.html',
    styleUrls: ['./card-car.component.scss'],
    standalone: true,
    imports: [BtnComponent, RouterLink]
})
export class CardCarComponent implements OnInit {

    @Input() car!: Car;

    imageLoaded!: boolean;

    constructor() { }
    ngOnInit(): void {
        this.imageLoaded = false
    }

    onImageLoad(): void {
        // Forzar 2 segundos antes de mostrar la imagen
        setTimeout(() => {
            this.imageLoaded = true;
        }, 1000);
    }

}
