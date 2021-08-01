import { Injectable } from '@angular/core';
import * as Parse from 'parse';

import { currentUser } from './getCurrentUserData.service';

@Injectable()
export class createNewTrip {
    invitedFriends: {email:String, id:String}[] = [];

    constructor(private currentUser: currentUser){

    }

    invite(el:any){
        this.invitedFriends.push({
          email: el,
          //Create a radomn id to the user so he/she can be deleted
          id: (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase() 
        });
      }

    deleteInvitation(key: String) {
      this.invitedFriends.forEach((value,index)=>{
          if(value.id==key) this.invitedFriends.splice(index,1);
      });
  } 

  async saveTripOnParse(formData:any){
    console.log(formData)
    const TripsPlan = Parse.Object.extend('TripsPlan');
    const Date = Parse.Object.extend('Date');
    const Budget = Parse.Object.extend('Budget');
    const NonUserInvited = Parse.Object.extend('NonUserInvited');

    const user = new Parse.User();
    user.id = this.currentUser.userId;

    let tripsPlan = new TripsPlan();
    let date = new Date();
    let budget = new Budget();
    let nonUserInvited = new NonUserInvited();

    try{
        //Save the date in the class TripPlan: city, listUsersPending, finished = false, owner ID, title
        await tripsPlan.save({
          title: formData.title,
          city: formData.destination,
          finished: false,
          owner: user,
        })
        //Check if there is an user with the emails informed. If yes, add them in the listUsersPendind.

        //Save the friends invited who does not have account in the class nonUserInvited: Email and tripsPlanId

      //Save budget options in the class Budget: tripsPlanId, budgetOne, budgetTwo, budgetThree
      await budget.save({
        budgetOne: +formData.budget.one,
        budgetTwo: +formData.budget.two,
        budgetThree: +formData.budget.three,
        tripsPlanId: tripsPlan
      })
      //Save dates options in the class Date: tripsPlanId, dataOneStart, dataOneEnd, dataTwoStart, dataTwoEnd, dataThreeStart, dataThreeEnd
      
      //Send email to invited friends

    }catch(err){
      console.log(err)
    }
    
    
  }

}