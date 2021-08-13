import { Injectable } from '@angular/core';
import * as Parse from 'parse';

import { getTripDetails } from  './getTripDetails.service';
import { currentUser } from './getCurrentUserData.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private getTripDetails: getTripDetails, private currentUser: currentUser) { }

  addVote(place: any){
    
    let Sight = Parse.Object.extend('Sight');
    let sight = new Sight();

    let TripPlan = Parse.Object.extend('TripsPlan');
    let tripPlan = new TripPlan();
    tripPlan.id = this.getTripDetails.currentTrip.id; // Create a new object with the tripPlan ID

    const user = new Parse.User(); // Create a user object with the loged user
    user.id = this.currentUser.userId;
    sight.relation('votes').add(user); // Add the user ID to the relational data

    const point = new Parse.GeoPoint({latitude: place.geoPoints.lat, longitude: place.geoPoints.lon}) // Create geopoint in Parse format
    
    /*
    * Save the sight in Parse
    */
    sight.save({
      name: place.name,
      tripsPlanId: tripPlan, // pointer
      photoUrl: place.urlImage , 
      XID: place.xid ,
      description: place.description ,
      geoPoint: point, // geopoint
    }).then((res:any)=>{

    }, (err:any)=>{
      console.log(err)
    })
  }
}
