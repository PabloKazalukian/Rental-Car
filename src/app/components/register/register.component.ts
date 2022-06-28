import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';
import { repeatPass } from 'src/app/shared/repeatPass.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  contactForm!:FormGroup;
  success:boolean = false
  error:boolean=false

  constructor(private readonly fb: FormBuilder,private authSvc:RegisterService,private router:Router) { }


  ngOnInit(): void {
    this.contactForm = this.initForm();
    // this.authSvc.verifyEmail("admin@gmail.com").subscribe(e=>console.log(e))
  }

  onSubmit():void{
    this.authSvc.registerUser(this.contactForm.value).subscribe({
      next: (res)=>{
        console.log('true',res);
        this.success = true
        // setTimeout( ()=> this.router.navigate(['login']),100)
      },
      error: (res)=>{
        console.log('false',res);
        this.success = false
        this.error = true
      }
    })

  }
  initForm():FormGroup{
    //declarar las propiedas que tendran nuestro formulario
    return this.fb.group({
      username:['',[Validators.required,Validators.minLength(3)]],
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],this.validarEmail.bind(this)],
      password1:['',[Validators.required,Validators.minLength(3)]],
      password2:['',[Validators.required,Validators.minLength(3)]],
    },{
      validators:repeatPass.dateCorrect,
    })
  }
  validarEmail(control: AbstractControl) {
    console.log(control)
    return this.authSvc.verifyEmail(control.value)
    .pipe(
      map(data =>{
        console.log(data)
        if(data){
          return {emailExist: true}
        }else{
          return null
        }
      }),
      catchError(error => error)
    )
  }

}
