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
  hasAcceptedInvitation = false;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private getTripDetails: getTripDetails) { 
    console.log('antigo' +this.tripId)
    //this.tripId = this.activeRoute.snapshot.params['id'];

    this.activeRoute.params.subscribe(el=> this.tripId = el['id'])

    
  }

  ngOnInit(): void {
    if(this.tripId !== ''){
      console.log(this.tripId)
      console.log('getting data')
      this.getTripDetails.getBasicInfo(this.tripId).then(()=>{
        this.title = this.getTripDetails.currentTrip.title;
        this.city = this.getTripDetails.currentTrip.destination;
        this.isTheOwner = this.getTripDetails.currentTrip.status.isTheOwner;
        this.hasAcceptedInvitation = this.getTripDetails.currentTrip.status.hasAcceptedInvitation
      });
      
    }

  }

  ngOnDestroy(){
    this.tripId = '';
    this.title = '';    
    this.city = '';
  }

  

}
