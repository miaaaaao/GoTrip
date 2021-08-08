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

    const relation = tripsPlan.relation("listUsersPending2")

    try{
        //Save the date in the class TripPlan: city, listUsersPending, finished = false, owner ID, title
        await tripsPlan.save({
          title: formData.title,
          city: formData.destination,
          finished: false,
          owner: user,
        })
        //Check if there is an user with the emails informed. If yes, add them in the listUsersPendind.
        //for await (let friendEmail of formData.invitedFriends)
          let friendsHaveAccount = [];
          let friendsZeroAccount = [];

          //Find if the users has account or not
          for (let i = 0; i < formData.invitedFriends.length; ++i){
            let friendEmail = formData.invitedFriends[i];
            console.log("STEP 1 ===>" +friendEmail.email)
            let queryUser = new Parse.Query(Parse.User);
            queryUser.equalTo("email", friendEmail.email);
            let userFound = await queryUser.find() || false;
            console.log("STEP 2 ===>" +userFound)
            if(userFound[0]){
              friendsHaveAccount.push(userFound[0])
            } else {
              friendsZeroAccount.push(friendEmail.email)
            }
          }

          //Save in TripPlan all friends who have account as relational data
          relation.add(friendsHaveAccount);
          await tripsPlan.save();
          
          //Save in NonUserInvited the users who does not have an account
          friendsZeroAccount.forEach(async function(email) {
            let nonUserInvited = new NonUserInvited();

            await nonUserInvited.save({
              Email: email,
              tripsPlanId: tripsPlan
              })
          })
 
      //Save budget options in the class Budget: tripsPlanId, budgetOne, budgetTwo, budgetThree
      await budget.save({
        budgetOne: +formData.budget.one,
        budgetTwo: +formData.budget.two,
        budgetThree: +formData.budget.three,
        tripsPlanId: tripsPlan
      })
      //Save dates options in the class Date: tripsPlanId, dataOneStart, dataOneEnd, dataTwoStart, dataTwoEnd, dataThreeStart, dataThreeEnd
      await date.save({
        dateOneStart: formData.date.one.start,
        dateOneEnd: formData.date.one.end, 
        dateTwoStart: formData.date.two.start,
        dateTwoEnd: formData.date.two.end, 
        dateThreeStart: formData.date.three.start,
        dateThreeEnd: formData.date.three.end, 
        tripsPlanId: tripsPlan
      })
      //Send email to invited friends
      await Parse.Cloud.run("sendInvitation", formData).then(response=>console.log(response))

    }catch(err){
      console.log(err)
    }
    
    
  }

}