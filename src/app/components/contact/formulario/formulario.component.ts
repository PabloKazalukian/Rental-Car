import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { email } from 'src/app/core/models/email.interface';
import { EmailService } from 'src/app/services/email.service';
interface contactForm{
  name: string,
  select: string,
  comment: string,
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit, OnDestroy {

  private subscripcions: Subscription[]=[];

  model:email ={
    name: '',
    email: '',
    comment: ''
  }
  error: boolean = false;
  success: boolean = false;

  constructor( private emailSvc: EmailService) { }

  ngOnInit(): void {
  }

  public onSubmit(form:email):void{
    // console.log('formolario validado,',form);
    this.subscripcions.push(

      this.emailSvc.sendEmail(form).subscribe({
        next: (res)=>{
          this.success = true
          // setTimeout( ()=> this.router.navigate(['login']),1700)
        },
        error: (res)=>{
          this.success = false
          this.error = true
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscripcions.forEach((e)=> e.unsubscribe())
  }
}
