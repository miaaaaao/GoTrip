import { Component, OnInit, ViewChild } from '@angular/core';
import {germany} from './cities/germany';
import {createNewTrip} from '../newTripForm.service';
import { NgForm } from '@angular/forms';

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
      one: null,
      two: null,
      three: null
    },
    invitedFriends: null,
  }

  constructor(private createNewTrip: createNewTrip) {
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
  //Get data from the data picker
  fillDates(el:any){
    console.log('==>' + new Date(el.date.end));
    console.log('===>' +el.id) 
  }
  //Function that run after user fills the form
  createPlan(el: NgForm){
    console.log(el)
  }

  

}
