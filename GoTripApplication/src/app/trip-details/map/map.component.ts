import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  title = 'here-project';
  private platform: any;

   @ViewChild("map")
   public mapElement!: ElementRef;


  public constructor() {

   this.platform = new H.service.Platform({
      "apikey": "HERE_API"
    });
  }

  public ngOnInit(): void { }

  public  ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
    let map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 10,
        center: { lat: 51.233334, lng: 6.78333 }
      }
    );
    console.log(map)
  }


}
