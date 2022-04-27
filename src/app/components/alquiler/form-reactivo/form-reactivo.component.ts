import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-reactivo',
  templateUrl: './form-reactivo.component.html',
  styleUrls: ['./form-reactivo.component.css']
})
export class FormReactivoComponent implements OnInit {
  @Input() id?:number;

  contactForm!:FormGroup;
  myField = new FormControl();//observable, para onChanges

  constructor(private readonly fb: FormBuilder) { }


  ngOnInit(): void {
    this.contactForm = this.initForm();
    console.log(this.id)
  }
  
  onSubmit():void{
    console.log('form ==>')

  }
  initForm():FormGroup{
    //declarar las propiedas que tendran nuestro formulario
    return this.fb.group({
      name:['',[Validators.required,Validators.minLength(3)]],
      checkAdult:['',[Validators.required,Validators.maxLength(3)]],
      dateInitial:['',[Validators.required]],
      dateEnd:['',[Validators.required]],
      select:['',[Validators.required,Validators.maxLength(3)]],
      comment:['',[Validators.required]]
    })
  }


}
