import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html',
  styleUrls: ['./alquiler.component.css']
})
export class AlquilerComponent implements OnInit {

  id!:number;
  constructor(private readonly route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params)=>{
        this.id = params['id']
      }
    )
  }

}
