import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { getTripDetails } from '../services/getTripDetails.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  tripId: string='';
  title: string='';
  city: string='';
  isTheOwner = false;
  hasAcceptedInvitation = true;
  hasReceivedData: boolean = false; // This is used to avoid load components with empty data

  constructor(private router: Router, private activeRoute: ActivatedRoute, private getTripDetails: getTripDetails) { 
    this.activeRoute.params.subscribe(el=> this.tripId = el['id']) // Get id from the URL

  }

  getInfoAboutThisTrip(){
    /*
    * Get information from Parse server to fill the information about the trip
    */
    if(this.tripId !== ''){
      this.getTripDetails.getBasicInfo(this.tripId)
      .then(()=>{
        this.title = this.getTripDetails.currentTrip.title;
        this.city = this.getTripDetails.currentTrip.destination;
        this.isTheOwner = this.getTripDetails.currentTrip.status.isTheOwner;
        this.hasAcceptedInvitation = this.getTripDetails.currentTrip.status.hasAcceptedInvitation;
        this.hasReceivedData = this.getTripDetails.receiveddata;
      });
    }
  }

  ngOnInit(): void {
    this.getInfoAboutThisTrip()
  }

  ngOnDestroy(){
    /*
    * Delete information when user leave the page
    */
    this.tripId = '';
    this.title = '';    
    this.city = '';

    this.getTripDetails.cleanCurrentTrip() // Remove stored data on the service
  }

  

}
