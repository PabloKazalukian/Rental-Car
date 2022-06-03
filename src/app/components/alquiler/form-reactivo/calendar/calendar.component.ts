import {Component, Injectable, OnInit} from '@angular/core';
import {DateAdapter} from '@angular/material/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit   {
  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });


  constructor() { }

  ngOnInit(): void {
  }

  rangeFilter(date: Date): boolean {
    console.log(date);
    return date.getDate() > 20;
  }

}
