import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { env } from 'src/app/env';
import { getTripDetails } from '../../services/getTripDetails.service';

@Component({
  selector: 'app-all-sights',
  templateUrl: './all-sights.component.html',
  styleUrls: ['./all-sights.component.css']
})
export class AllSightsComponent implements OnInit {
  city: string = '';
  isTheOwner: boolean = false;
  listOfSights: {}[] = [];

  openTrip_API:any = this.env.OPENTRIP_API;
  urlBase:string = "https://api.opentripmap.com/0.1/en/places/";
  lat: number = 0 ;
  lon: number = 0;
  offset: number = 0; // offset from first object in the list
  limit: number = 3; // limit the number of results form the API
  count: number = 0; // total objects count
  radius: number = 9000; // Area where the api will search for sights
  lang: string = 'en';
  country: string = 'DE';
  rate: number = 3; // How many starts it got.


  constructor(private getTripDetails: getTripDetails, private http: HttpClient, private env:env) { 
    

  }

  ngOnInit(): void {
    this.getInitialdata()
    this.getGeoLocation()
  }

  getInitialdata(){
    this.city = this.getTripDetails.currentTrip.destination;
    this.isTheOwner = this.getTripDetails.currentTrip.status.isTheOwner;
  }

  /*
  * This function Fetch the lon and lat of the city
  */
  getGeoLocation(){
    let method: string = 'geoname';
    let name: string = this.city;

    let url = `${this.urlBase}/${method}?lang=${this.lang}&name=${name}&country=${this.country}&apikey=${this.openTrip_API}`;

    this.http.get<{name: string, country: string, lat: number, lon:number, population: number, timezone: string, status: string}>(url)
    .subscribe(resp=>{
      console.log(resp.status)
      if(resp.status == 'OK'){
        this.lat = resp.lat;
        this.lon = resp.lon;
        this.getSightList() // Starts the fucntion that will look for sights based on the lat and lon

      } else {}
     
     
    })
  
    }
    

  /*
  * This functiin search for sights in the city based on lat and lon
  */
  getSightList(){
    //`radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count`
    let method: string = 'autosuggest';
    let format: string = 'count';
    let name: string = this.city;

    let url = `${this.urlBase}/${method}?lang=${this.lang}&name=${name}&radius=${this.radius}&limit=${this.limit}&offset=${this.offset}&format=${format}&lat=${this.lat}&lon=${this.lon}&rate=${this.rate}&apikey=${this.openTrip_API}`;

    this.http.get<{dist:number, highlighted_name: string, kinds: string, name: string, point: {lon: number, lat: number}, rate: number, wikidate: string, xid: string}[]>(url)
    .subscribe(resp=>{
      for(let i = 0; i < resp.length; i++){
         this.getSightInfo(resp[i].xid);
      }
      console.log(resp)
      
    })
 }


  /*
  * This function get specific informations about each place and save in a array of objetcs
  *
  */
  getSightInfo(xid:string){
    let method: string = 'xid'

    let url = `${this.urlBase}/${method}/${xid}?lang=${this.lang}&apikey=${this.openTrip_API}`;
    this.http.get(url)
    .subscribe((resp:any)=>{
      let newSight: {} = {
        xid: resp.xid,
        name: resp.name,
        urlImage: resp.preview.source,
        description: resp.wikipedia_extracts.text,
        geoPoints: {
          lon: resp.point.lon,
          lat: resp.point.lat
        }
      }
      this.listOfSights = [...this.listOfSights, newSight ]
      console.log(this.listOfSights)
    })
  }

}
