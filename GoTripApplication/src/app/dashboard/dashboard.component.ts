import { Component, OnInit } from '@angular/core';
import { getTrip } from '../services/getTrip.service';
import { currentUser } from '../services/getCurrentUserData.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string = this.currentUser.name;
  currentTrips: {}[] = [];
  oldTrips: {}[] =[];

  constructor(private getTrip: getTrip, private currentUser: currentUser) { }

  ngOnInit(): void {
    this.getTrip.fetchParseData();
    this.currentTrips = this.getTrip.currentTrips;
    this.oldTrips = this.getTrip.oldTrips;
  }

  update(){
    console.log('UPDATNG ACTIVATED')
    this.currentTrips = this.getTrip.currentTrips;
    this.oldTrips = this.getTrip.oldTrips;
  }

}
