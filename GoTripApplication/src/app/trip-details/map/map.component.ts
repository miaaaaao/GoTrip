import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  public map: any;

  public constructor() {
    
  }

  public ngOnInit() { 
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