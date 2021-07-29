import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.css']
})
export class DatetimepickerComponent implements OnInit {
  daterangepickerOptions = {
    //startDate: "10/06/2021",
    //endDate: "09/02/2022",
    format: "DD/MM/YYYY",
    disableWeekEnds: false,
    disabledDays: [],
    disabledDates: [],
    autoApply: true,
    inactiveBeforeStart: true,
    required: true,
    placeholder: "Select date",
    hideControls: true,
    noDefaultRangeSelected: true
  };

  constructor() { }

  ngOnInit(): void {
  }
  rangeSelected(el:any){
    console.log('=====> Date selected')

  }

}
