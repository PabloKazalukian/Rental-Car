import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { LoginService } from './../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  contactForm!:FormGroup;
  login!:boolean
  private subscripcions: Subscription[]=[];


  constructor(private readonly fb: FormBuilder,private authSvc:LoginService,private router:Router) { }


  ngOnInit(): void {


    this.contactForm = this.initForm();
  }

  onSubmit():void{
    this.subscripcions.push(
      this.authSvc.checkLogin(this.contactForm.value).subscribe({
        next: (res)=>{
          this.login=true
          setTimeout( ()=> this.router.navigate(['/']),2000)
        },
        error: (res)=>{
          this.login=false
      },
      })

    )

  }
  initForm():FormGroup{
    //declarar las propiedas que tendran nuestro formulario
    return this.fb.group({
      email:['',[Validators.required,Validators.minLength(3)]],
      password:['',[Validators.required,Validators.minLength(3)]],
    })
  }

  ngOnDestroy(): void {
    this.subscripcions.forEach((e)=> e.unsubscribe())
  }

}
