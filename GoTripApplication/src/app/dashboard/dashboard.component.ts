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
  isLoading: boolean = true;

  constructor(private getTrip: getTrip, private currentUser: currentUser) { }

  async ngOnInit(): Promise<any> {
    this.isLoading = true;
    await this.getTrip.fetchParseData();
    this.currentTrips = this.getTrip.currentTrips;
    this.oldTrips = this.getTrip.oldTrips;
    this.isLoading = false;
  }

  update(){
    console.log('UPDATNG ACTIVATED')
    this.currentTrips = this.getTrip.currentTrips;
    this.oldTrips = this.getTrip.oldTrips;
  }

}
