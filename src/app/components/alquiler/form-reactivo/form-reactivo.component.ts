import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Car } from 'src/app/core/models/car.interface';
import {DateAdapter} from '@angular/material/core';
import { request,requestSend } from 'src/app/core/models/request.interface';
import { LoginService } from 'src/app/services/login.service';
import { RentalService } from 'src/app/services/rental.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-reactivo',
  templateUrl: './form-reactivo.component.html',
  styleUrls: ['./form-reactivo.component.css']
})

export class FormReactivoComponent implements OnInit {
  @Input() id!:string;
  @Input() cars?:Car | undefined;

  range = new FormGroup({
    start: new FormControl(null,[Validators.required]),
    end: new FormControl(null,[Validators.required]),
  });

  contactForm!:FormGroup;
  myField = new FormControl();//observable, para onChanges
  userId?:number
  success!:boolean

  constructor(private readonly fb: FormBuilder,private authSvc:LoginService,private rentalSvc:RentalService,private router:Router) { }


  ngOnInit(): void {
    this.contactForm = this.initForm();
    this.authSvc.readToken().subscribe((res)=>this.userId =res.userId)
  }

  onSubmit():void{
    let start = new DatePipe('en').transform(this.range.value.start, 'yyyy-MM-dd');
    let end = new DatePipe('en').transform(this.range.value.end, 'yyyy-MM-dd');
    if(start && end){
      let result:requestSend ={
        initial_date:start,
        final_date:end,
        created_by:this.userId,
        rented_car:parseInt(this.id,10),
      }
      this.rentalSvc.sendRequest(result).subscribe({
        next: (res)=>{
          this.success = true
          setTimeout( ()=> this.router.navigate(['']),100)
        },
        error: (res)=>{
          this.success = false
        }
      })
    }
  }
  initForm():FormGroup{
    //declarar las propiedas que tendran nuestro formulario
    return this.fb.group({
      name:['',[Validators.required,Validators.minLength(3)]],
      comment:['',[Validators.required]]
    })
  }


}
