/*
* This is to be used on the details page to get data to fill the 
* information about the selected trip plan.
*
*/

import { Injectable } from '@angular/core';
import * as Parse from 'parse';

import { currentUser } from './getCurrentUserData.service';

@Injectable()
export class getTripDetails {

    constructor(private currentUser: currentUser){

    }

    currentTrip = {
        status:{
            isTheOwner: false,
            hasAcceptedInvitation: true,
        }, 
        title: '',
        destination: '',
        budget: {
          one: null,
          two: null,
          three: null
        },
        date: {
          one: {},
          two: {},
          three: {}
        },
        invitedFriends: [{}],
      }

      async getBasicInfo(id:string){ 
        /* 
        * This function is to get the Title, City and Find out if the user is the 
        * owner and if he/she accepted the invitation
        * */
        let tripPlan = Parse.Object.extend('TripsPlan')
        let queryTripPlan = new Parse.Query(tripPlan)
        tripPlan.id = id;
        queryTripPlan.equalTo("objectId", tripPlan.id); // Find the trip plan that has the informed ID

        try{
            /*
            * Get information about city and trip title
            */
            let trip = await queryTripPlan.find(); // fetch data from Parse
            this.currentTrip.title = trip[0].get('title'); //Get the title and save in the local object
            this.currentTrip.destination = trip[0].get('city'); // Get the city and save in the local object
            /*
            * Get information about ownership
            */
            let owner = trip[0].get('owner')
            owner.id == this.currentUser.userId ? this.currentTrip.status.isTheOwner = true : this.currentTrip.status.isTheOwner = false;
            /*
            * Find if the user has accepted the invitation in case he is not the trip owner.
            */
            if(!this.currentTrip.status.isTheOwner){
                let user = new Parse.User();
                user.id = this.currentUser.userId;

                let queryPendingList = new Parse.Query(tripPlan);
                queryPendingList.equalTo('listUsersPending2', user); // First find the trips plan where the user were invited
                queryPendingList.equalTo("objectId", tripPlan.id); // Find specific trip plan

                let allTripUserIsInvited = await queryPendingList.find() // Fetch data from parse
                allTripUserIsInvited.length > 0 ? this.currentTrip.status.hasAcceptedInvitation = false : this.currentTrip.status.hasAcceptedInvitation = true   //If it returns an array it menas the user is in the pending list
            }

        }catch(err){
            console.log(err) // Show error in the console
        }
        
      }
}