import { Component, OnInit } from '@angular/core';
interface contactForm{
  name: string,
  checkAdult: boolean,
  select: string,
  comment: string,
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  model ={
    name: '',
    checkAdult: false,
    select: '',
    comment: ''
  }
  constructor() { }

  ngOnInit(): void {
  }
  
  public onSubmit(form:any):void{
    console.log('formolario validado,',form)
  }

}
