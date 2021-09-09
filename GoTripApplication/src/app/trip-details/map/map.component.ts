import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { getTripDetails } from '../../services/getTripDetails.service';

import { GetAddedSightService } from '../../services/get-added-sight.service';

declare var L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  public map: any;
  isTheOwner: boolean = false;
  geoLocation: any;
  allSights: any;

  public constructor(private getTripDetails: getTripDetails, private getAddedSightService: GetAddedSightService) {
    this.geoLocation = this.getTripDetails.currentTrip.geoLocation; // Save current city geolocation
  }

  public ngOnInit() { 
    this.isTheOwner = this.getTripDetails.currentTrip.status.isTheOwner; // Search if the user is the owner. If yes he can remove the sights

    //Get all added sights
    this.getAddedSightService.getSights() 
    this.allSights = this.getAddedSightService.addedSights;
    
    //Start the map
    this.map = L.map('map', {
      scrollWheelZoom: false,
    }).setView([this.geoLocation.lat, this.geoLocation.lon], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

  }

}