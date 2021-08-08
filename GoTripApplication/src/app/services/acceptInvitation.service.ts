import { Injectable } from '@angular/core';
import * as Parse from 'parse';

import { currentUser } from '../getCurrentUserData.service';

@Injectable()
export class acceptInvitation {

    constructor(private currentUser: currentUser){
        
    }

    accept(id:any){
        let tripsPlan = new Parse.Object('TripsPlan');
        tripsPlan.id = id;  
        const user = new Parse.User();
        user.id = this.currentUser.userId;
        
        console.log("==> Altedanto user" +user.id)
        console.log("Card trip==>" +id)
        //Remover user from listUsersPending2
        tripsPlan.relation('listUsersPending2').remove(user);
        //Add user to listUsersConfirmed2
        tripsPlan.relation('listUsersConfirmed2').add(user);

        tripsPlan.save()

        //ask to get the new data

    }
}