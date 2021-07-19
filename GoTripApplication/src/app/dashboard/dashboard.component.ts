import { Component, OnInit } from '@angular/core';
import { getTrip } from '../getTrip.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string = "John Warn";
  currentTrips: {}[] = [];
  oldTrips: {}[] =[];

  constructor(private getTrip: getTrip) { }

  ngOnInit(): void {
    this.currentTrips = this.getTrip.currentTrips;
    this.oldTrips = this.getTrip.oldTrips;
  }

}
