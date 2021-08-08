import { Component, Input, OnInit } from '@angular/core';

import { acceptInvitation } from '../../services/acceptInvitation.service';

@Component({
  selector: 'app-active-trip-card',
  templateUrl: './active-trip-card.component.html',
  styleUrls: ['./active-trip-card.component.css']
})
export class ActiveTripCardComponent implements OnInit {
  invitedUser: boolean = true;
  @Input('tripPlan') tripPlan:any;

  constructor(private acceptInvitation: acceptInvitation) { }

  ngOnInit(): void {
   
  }

  declineInvitation(){
    //Go to listUsersPending2 and remove this user
    console.log('I dont want to go' + this.tripPlan.id)
  }

  acceptInvitationButton(){
    //Go to listUsersPending2 and remove the user and add to listUsersConfirmed2
    console.log('Sure I wan tot go' + this.tripPlan.id)
    this.acceptInvitation.accept(this.tripPlan.id)
  }

  showTripDetails(){
    console.log('This trip details' +this.tripPlan.id)
  }

}
