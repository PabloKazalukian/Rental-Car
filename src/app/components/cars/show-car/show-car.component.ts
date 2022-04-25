import { Car } from './../../../core/models/car.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-car',
  templateUrl: './show-car.component.html',
  styleUrls:['./show-car.component.css']

})
export class ShowCarComponent  {
  @Input() cars!: Array<Car>;
}
