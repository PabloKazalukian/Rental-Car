import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-logged',
  templateUrl: './dialog-logged.component.html',
  styleUrls: ['./dialog-logged.component.css']
})
export class DialogLoggedComponent implements OnInit {

  show:boolean=true
  constructor() { }

  ngOnInit(): void {
  }

  close():void{
    this.show=false
  }

}
