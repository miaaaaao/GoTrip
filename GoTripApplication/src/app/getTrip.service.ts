// 
//This is a service to get data from Parse serve to be shown on the dashboard 
// v9PoMROgUK
import { Injectable } from '@angular/core';
import * as Parse from 'parse';

import { currentUser } from './getCurrentUserData.service';

class TripModel {
    id: String = '';
    title: String = '';
    city: String = '';
    date: String = '';
    owner: String = '';
    acceptedInvitation: Boolean = true;

    constructor(id: String, title: String, city: String, date: String, owner: String, acceptedInvitation: Boolean){
        this.title = title;
        this.city = city;
        this.date = date;
        this.owner = owner;
        this.acceptedInvitation = acceptedInvitation;
        this.id = id;
    }
}

@Injectable()
export class getTrip {
    currentTrips:{}[] = [];
    oldTrips:{}[] = [];

    constructor(private currentUser: currentUser){
        
    }

    dataClen(){
        this.currentTrips = [];
        this.oldTrips = []
    };

    async fetchParseData(){
        try{
        //Clean data before do new fetch
        this.dataClen();
        //Creating a temporary user --> Change it for current.user
        const user = new Parse.User();
        user.id = this.currentUser.userId;
        
        //Search for the current user's data
        const planOwner = new Parse.Query('TripsPlan');
        planOwner.equalTo("owner", user);

        const planInvited = new Parse.Query('TripsPlan');
        planInvited.equalTo("listUsersPending2", user);

        const planInvitationConfirmed = new Parse.Query('TripsPlan');
        planInvitationConfirmed.equalTo("listUsersConfirmed2", user);

        const mainQuery = Parse.Query.or(planOwner, planInvited, planInvitationConfirmed);

        const results = await mainQuery.find();
        
        
       
        // Do something with the returned Parse.Object values
        for (let i = 0; i < results.length; i++) {
            const object = results[i];
            //Check of the trip was finished
            let status = object.get('finished');
            //Get the date linked to this trip
            let data = 'TBC';
            //Get the owner name linked to this trip
            let owner = object.get('owner')
            if(owner.id == user.id){
                owner = 'You'
            }else{
                //Search the owner's name
                const findOwnerName = new Parse.Query(Parse.User);
                findOwnerName.equalTo("objectId", owner.id);
                const ownerResult = await findOwnerName.first();
                owner = ownerResult?.get('username');
            }
            //Check if invitaion was accepted
            let acceptedInvitation = false;
            await object.relation('listUsersConfirmed2').query().each(function(relatedObject) {
                if(relatedObject.id == user.id) acceptedInvitation = true;
             })

            let trip = new TripModel(object.id, object.get('title'), object.get('city'), data, owner, acceptedInvitation);
            if(status){
                //Trip finished
                this.oldTrips.push(trip);
            }else{
                this.currentTrips.push(trip)
            }
          }
        }catch(err){
            console.log(err)
        }  
    }

};