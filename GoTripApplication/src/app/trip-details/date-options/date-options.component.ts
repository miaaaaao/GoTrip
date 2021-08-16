import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-options',
  templateUrl: './date-options.component.html',
  styleUrls: ['./date-options.component.css']
})
export class DateOptionsComponent implements OnInit {
  @Input() currentTrip:any;

  constructor() { }

  ngOnInit(): void {
    if(!this.currentTrip){
      this.currentTrip = {
        status:{
          hasAcceptedInvitation: false
        },
        date:{
          one: {start: 0, end: 0},
          two: {start: 0, end: 0},
          three: {start: 0, end: 0},
        }
      }
    }
  }

}
