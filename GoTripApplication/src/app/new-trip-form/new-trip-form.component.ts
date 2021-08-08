import { Component, OnInit, ViewChild } from '@angular/core';
import {germany} from './cities/germany';
import {createNewTrip} from '../newTripForm.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-trip-form',
  templateUrl: './new-trip-form.component.html',
  styleUrls: ['./new-trip-form.component.css']
})
export class NewTripFormComponent implements OnInit {
  @ViewChild('formValue') sigupForm:any;
  cities:{id:Number, name:String}[] = [];
  invitedFriend: String = '';
  invitedFriends: {}[] = [];

  tripForm = {
    title: null,
    destination: null,
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

  constructor(private createNewTrip: createNewTrip, private router: Router) {
    //get list of germany cities and save each item as a object inside an array
    for(let i =0; i<germany.length; i++){
      this.cities.push({
        id: i+1,
        name: germany[i]
      })
    }
   }

  ngOnInit(): void {
    this.invitedFriends = this.createNewTrip.invitedFriends;
    
  }
  //Add current written email to the array: invitedFriends to save all friends email
  invite(){
    this.createNewTrip.invite(this.invitedFriend);
  }
  //Get data from the data picker and save on the tripform object
  fillDates(el:any){
    let dateId = el.id;
    if(dateId === 'one'){
      this.tripForm.date.one = {start: new Date(el.date.start), end: new Date(el.date.end)} 
    }else if (dateId === 'two'){
      this.tripForm.date.two = {start: new Date(el.date.start), end: new Date(el.date.end)}
    }else if (dateId === 'three'){
      this.tripForm.date.three = {start: new Date(el.date.start), end: new Date(el.date.end)}
    } else {
      console.log('No ID found for this data entry')
    }
  }
  //Function that run after user fills the form and clicks on create button
  async createPlan(el: NgForm, buttonId: any){
    if (buttonId !== "createTripPlan") return ;
    console.log(buttonId)
    //fill tripForm object
    this.tripForm.title = el.value.Title;
    this.tripForm.destination = el.value.city.name;
    this.tripForm.budget.one = el.value.budget_1;
    this.tripForm.budget.two = el.value.budget_2;
    this.tripForm.budget.three = el.value.budget_3;
    this.tripForm.invitedFriends = this.invitedFriends;
    //call function from newTripForm.service to save data into Parse
    await this.createNewTrip.saveTripOnParse(this.tripForm)
    //Go back to dashboard
    this.cancel();
    //Clean friends list
    this.createNewTrip.cleanInvitationList()
  }

  cancel(){
    //Clean frinds list
    this.createNewTrip.cleanInvitationList()
    // Go back to dashboard
    this.router.navigate(['../dashboard'])
  }

  

}
