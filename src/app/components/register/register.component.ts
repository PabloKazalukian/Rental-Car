import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { LoginService } from './../../services/login.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  contactForm!:FormGroup;
  success!:boolean

  constructor(private readonly fb: FormBuilder,private authSvc:RegisterService,private router:Router) { }


  ngOnInit(): void {
    this.contactForm = this.initForm();

  }

  onSubmit():void{
    this.authSvc.registerUser(this.contactForm.value).subscribe({
      next: (res)=>{
        this.success = true
        setTimeout( ()=> this.router.navigate(['login']),100)
      },
      error: (res)=>{
        this.success = false
      }
    })

  }
  initForm():FormGroup{
    //declarar las propiedas que tendran nuestro formulario
    return this.fb.group({
      username:['',[Validators.required,Validators.minLength(3)]],
      email:['',[Validators.required,Validators.minLength(3)]],
      password:['',[Validators.required,Validators.minLength(3)]],
      confirmPassword:['',[Validators.required,Validators.minLength(3)]],
    })
  }

}
