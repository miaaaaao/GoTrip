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
  }

}
