import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Car } from 'src/app/core/models/car.interface';
import { request,requestSend } from 'src/app/core/models/request.interface';
import { LoginService } from 'src/app/services/login.service';
import { RentalService } from 'src/app/services/rental.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ownValidation } from './calendar/app.validator';

@Component({
  selector: 'app-form-reactivo',
  templateUrl: './form-reactivo.component.html',
  styleUrls: ['./form-reactivo.component.css']
})

export class FormReactivoComponent implements OnInit,OnDestroy {
  @Input() id!:string;
  @Input() cars?:Car | undefined;

  arrRequest!:request[]
  range!:FormGroup;
  private subscripcions: Subscription[]=[];


  contactForm!:FormGroup;
  myField = new FormControl();
  userId?:number
  success!:boolean

  constructor(private readonly fb: FormBuilder,private authSvc:LoginService,private rentalSvc:RentalService,private router:Router) { }


  ngOnInit(): void {
    this.contactForm = this.initForm();
    this.subscripcions.push(
      this.authSvc.readToken().subscribe((res)=>this.userId =res.userId)
    )
    this.range = this.initFormDates(null);
    this.subscripcions.push(
      this.rentalSvc.getRequestById(this.id).subscribe((res)=>{
        this.arrRequest = res;
        this.range = this.initFormDates(res);
      })
    )
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

    return this.fb.group({
      name:['',[Validators.required,Validators.minLength(3)]],
      comment:['',[Validators.required]]
    })
  }

  initFormDates (res:request[] | null):FormGroup{
    return this.fb.group({
      start: new FormControl(null,),
      end: new FormControl(null),
      total: new FormControl(res)
    },{ validators:
      ownValidation.dateCorrect});
  }

  ngOnDestroy(): void {
    this.subscripcions.forEach((e)=> e.unsubscribe())
  }

}
