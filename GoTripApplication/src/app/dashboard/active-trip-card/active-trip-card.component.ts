import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-trip-card',
  templateUrl: './active-trip-card.component.html',
  styleUrls: ['./active-trip-card.component.css']
})
export class ActiveTripCardComponent implements OnInit {
  invitedUser: boolean = true;
  @Input() tripPlan:any;

  constructor() { }

  ngOnInit(): void {
   
  }

}
