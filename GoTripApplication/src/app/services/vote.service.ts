import { Injectable } from '@angular/core';
import * as Parse from 'parse';

import { getTripDetails } from  './getTripDetails.service';
import { currentUser } from './getCurrentUserData.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private getTripDetails: getTripDetails, private currentUser: currentUser) { }

  /*
  * Fucntion to save the sight the user like in Parse
  */
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

  /*
  * Function to get the sigts id the logged user liked
  */
  async getUserVotes(){
    let userVotes:any = [];

    const user = new Parse.User(); // Create a user object with the loged user
    user.id = this.currentUser.userId;

    // Get list of trip has tripId
    let TripPlan = Parse.Object.extend('TripsPlan');
    let tripPlan = new TripPlan();
    tripPlan.id = this.getTripDetails.currentTrip.id;

    let Sight = Parse.Object.extend('Sight');
    let sightQueryTripId = new Parse.Query(Sight)
    sightQueryTripId.equalTo('tripsPlanId', tripPlan)

    let sightQueryVotedByUser = new Parse.Query(Sight);
    sightQueryVotedByUser.equalTo('votes', user)

    let mainQuery = Parse.Query.or(sightQueryTripId, sightQueryVotedByUser) // Find sights the user voted and are from this specific trip plan
    let result = await mainQuery.find();
    
    for(let i=0; i < result.length; i++){
      userVotes.push(result[i].get('XID')) // search the XID of the trips user voted and store in array
    }
    return userVotes;
  }
}
