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

  invite(){
    this.createNewTrip.invite(this.invitedFriend);
  }

  createPlan(el: NgForm){
    console.log(el)
  }

  

}
