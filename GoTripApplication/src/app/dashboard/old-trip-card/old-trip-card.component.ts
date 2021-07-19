import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-old-trip-card',
  templateUrl: './old-trip-card.component.html',
  styleUrls: ['./old-trip-card.component.css']
})
export class OldTripCardComponent implements OnInit {
  @Input() pastTrip:any;

  constructor() { }

  ngOnInit(): void {
  }

}
