import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { env } from 'src/app/env';
import { getTripDetails } from '../../services/getTripDetails.service';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-all-sights',
  templateUrl: './all-sights.component.html',
  styleUrls: ['./all-sights.component.css']
})
export class AllSightsComponent implements OnInit {
  city: string = '';
  isTheOwner: boolean = false;
  listOfSights: {}[] = [];
  hasAcceptedInvitation: boolean = false;
  isLoading: boolean = false;
  sightsVoted: [] = [] //List of XID of sites voted by this user

  openTrip_API:any = this.env.OPENTRIP_API;
  urlBase:string = "https://api.opentripmap.com/0.1/en/places/";
  lat: number = 0 ;
  lon: number = 0;
  offset: number = 0; // offset from first object in the list
  limit: number = 3; // limit the number of results form the API
  radius: number = 9000; // Area where the api will search for sights
  lang: string = 'en';
  country: string = 'DE';
  rate: number = 3; // How many starts it got.

  count: number = 0; // total objects count
  pageLength: number = 3 // number of cards per page
  total: number = 0;

  calculateTotalItensShown(){
    if(this.count > 0){
      this.total = this.offset + this.pageLength
    } else {
      this.total = 0
    }
    
  }
  constructor(private getTripDetails: getTripDetails, private http: HttpClient, private env:env, private voteService: VoteService) { 
    

  }

  ngOnInit(): void {
    this.getInitialdata()
    this.getGeoLocation()
    this.voteService.getUserVotes().then(res=> this.sightsVoted = res); // load votes from this user
  }

  getInitialdata(){
    this.city = this.getTripDetails.currentTrip.destination;
    this.isTheOwner = this.getTripDetails.currentTrip.status.isTheOwner;
    this.hasAcceptedInvitation = this.getTripDetails.currentTrip.status.hasAcceptedInvitation
  }

  /*
  * This function Fetch the lon and lat of the city
  */
  getGeoLocation(){
    let method: string = 'geoname';

    let url = `${this.urlBase}/${method}?lang=${this.lang}&name=${this.city}&country=${this.country}&apikey=${this.openTrip_API}`;

    this.http.get<{name: string, country: string, lat: number, lon:number, population: number, timezone: string, status: string}>(url)
    .subscribe(resp=>{
      console.log(resp.status)
      if(resp.status == 'OK'){
        this.lat = resp.lat;
        this.lon = resp.lon;
        this.getAmount() // get number of elements
        this.getSightList() // Starts the fucntion that will look for sights based on the lat and lon
        console.log(resp.lat + '    '  + resp.lon)
      } else {}
     
     
    })
  
    }
  /*
  * Find the amount of sights based on the place
  */  
  getAmount(){
    let method: string = 'radius';
    let format: string = 'count';

    let url = `${this.urlBase}/${method}?lang=${this.lang}&format=${format}&name=${this.city}&radius=${this.radius}&limit=${this.limit}&offset=${this.offset}&lat=${this.lat}&lon=${this.lon}&rate=${this.rate}&apikey=${this.openTrip_API}`;

    this.http.get<{count: number}>(url)
    .subscribe(resp=>{
      this.count = resp.count;
    })
  }

  /*
  * This functiin search for sights in the city based on lat and lon
  */
  getSightList(){
    this.isLoading = true;
    //`radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count`
    let method: string = 'autosuggest';

    let url = `${this.urlBase}/${method}?lang=${this.lang}&name=${this.city}&radius=${this.radius}&limit=${this.limit}&offset=${this.offset}&lat=${this.lat}&lon=${this.lon}&rate=${this.rate}&format=json&apikey=${this.openTrip_API}`;

    this.http.get<{dist:number, highlighted_name: string, kinds: string, name: string, point: {lon: number, lat: number}, rate: number, wikidate: string, xid: string}[]>(url)
    .subscribe(resp=>{
      /*
      * This is to handle the limits. OpenTripMap free account allows 10 request per second.
      * The bellow code will make the system wait 1 second if return an array with more then 5 sights
      */
     console.log('======>' + resp[0])
      if(resp.length <= 5){
        for(let i = 0; i < resp.length; i++){
          this.getSightInfo(resp[i].xid);
       }
      } else {
        for(let i = 0; i <= 4 ; i++){
          this.getSightInfo(resp[i].xid);
       }
       // Add a delay of 2 second
       setTimeout(()=>{
        for(let i = 5; i <= resp.length; i++){
          this.getSightInfo(resp[i].xid);
       }
      }, 2000); 
      }
      this.calculateTotalItensShown();
      this.isLoading = false;
      
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
      
      let findxid = this.sightsVoted.find(el=> el == resp.xid)

      let newSight: {} = {
        xid: resp.xid,
        name: resp.name,
        urlImage: resp.preview.source,
        description: resp.wikipedia_extracts.text,
        geoPoints: {
          lon: resp.point.lon,
          lat: resp.point.lat
        },
        userVoted: findxid ? true : false
      }
      this.listOfSights = [...this.listOfSights, newSight ]
      console.log(this.listOfSights)
    })
  }

  /*
  * Get data for the next page
  */
  nextPage(){
    this.offset = this.offset + this.pageLength; // calculate the next
    this.listOfSights = [] // Remove itens of previous search from the list
    this.getSightList(); // Get next sights
    this.calculateTotalItensShown() // calculate the total sight shown to update the button
    console.log(this.offset)
    console.log(this.total)
  }

}
