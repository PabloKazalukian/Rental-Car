import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-taxtarea',
  templateUrl: './taxtarea.component.html',
  styleUrls: ['./taxtarea.component.css']
})
export class TaxtareaComponent implements OnInit {

    @Input() control!: FormControl;
    @Input() label!: string;
    @Input() placeholder: string = '';


  constructor() { }

  ngOnInit(): void {
  }

  get showError(): boolean {
    return this.control?.touched && this.control?.invalid;
  }

}
