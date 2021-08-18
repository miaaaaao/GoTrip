import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.css']
})
export class DatetimepickerComponent implements OnInit {
  @Input('formId') formId: any;
  @Output() sendData = new EventEmitter();

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
    this.sendData.emit({date: el, id: this.formId});
    console.log('=====> Date selected')
   
  

  }

}
