import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { getTripDetails } from '../../services/getTripDetails.service';

declare var L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  public map: any;
  isTheOwner: boolean = false;

  public constructor(private getTripDetails: getTripDetails) {
   
  }

  public ngOnInit() { 
    this.isTheOwner = this.getTripDetails.currentTrip.status.isTheOwner; // Search if the user is the owner. If yes he can remove the sights

    this.map = L.map('map', {
      scrollWheelZoom: false,
    }).setView([51.1657, 10.4515], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

  }

  public ngAfterViewInit() {
      
  }

}