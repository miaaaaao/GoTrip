/*
* Here is the code activated when the trip owner clicks on the add button located
* on the cards sight. It will go to the sight class and turn addedToTrip into true
*/

import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { getTripDetails } from  './getTripDetails.service';
import { currentUser } from './getCurrentUserData.service';

@Injectable({
  providedIn: 'root'
})
export class AddSightService {

  constructor(private getTripDetails: getTripDetails, private currentUser: currentUser) { }

  async addSight(place:any){
    console.log(place)
    let Sight = Parse.Object.extend('Sight');
    let sight = new Sight();
    sight.id = place.sightServerId;

    sight.set('addedToTrip', true)
    
    /*
    * Save the update in Parse
    */
    await sight.save().then((res:any)=>{
      console.log('movedo to true')
      //this.updateUISightVoted.next(); // Update the UI
    }, (err:any)=>{
      console.log(err)
    })
  
  }

}
