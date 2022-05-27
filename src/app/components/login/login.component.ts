import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  contactForm!:FormGroup;

  constructor(private readonly fb: FormBuilder,private authSvc:LoginService) { }


  ngOnInit(): void {
    this.contactForm = this.initForm();

  }

  onSubmit():void{
    console.log('form ==>',this.contactForm.value)
    this.authSvc.checkLogin(this.contactForm.value).subscribe((res)=>console.log('resistire',res))

  }
  initForm():FormGroup{
    //declarar las propiedas que tendran nuestro formulario
    return this.fb.group({
      email:['',[Validators.required,Validators.minLength(3)]],
      password:['',[Validators.required,Validators.minLength(3)]],

    })
  }

}
