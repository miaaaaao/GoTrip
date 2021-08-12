import { Component, OnInit } from '@angular/core';
import { getTripDetails } from '../../services/getTripDetails.service';

@Component({
  selector: 'app-all-sights',
  templateUrl: './all-sights.component.html',
  styleUrls: ['./all-sights.component.css']
})
export class AllSightsComponent implements OnInit {
  city: string = '';
  isTheOwner: boolean = false;

  constructor(private getTripDetails: getTripDetails) { 
    

  }

  ngOnInit(): void {
    this.getInitialdata()
  }

  getInitialdata(){
    this.city = this.getTripDetails.currentTrip.destination;
    this.isTheOwner = this.getTripDetails.currentTrip.status.isTheOwner;
  }
  

}
