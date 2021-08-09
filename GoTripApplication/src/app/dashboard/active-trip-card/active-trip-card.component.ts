import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { acceptInvitation } from '../../services/acceptInvitation.service';
import { rejectInvitation } from '../../services/rejectInvitation.service';

@Component({
  selector: 'app-active-trip-card',
  templateUrl: './active-trip-card.component.html',
  styleUrls: ['./active-trip-card.component.css']
})
export class ActiveTripCardComponent implements OnInit {
  invitedUser: boolean = true;
  @Input('tripPlan') tripPlan:any;
  @Output() updateDashboad = new EventEmitter;

  constructor(private acceptInvitation: acceptInvitation, private rejectInvitation: rejectInvitation) { }

  ngOnInit(): void {
   
  }

  async declineInvitation(){
    //Go to listUsersPending2 and remove this user
    console.log('I dont want to go' + this.tripPlan.id)
    await this.rejectInvitation.reject(this.tripPlan.id)
    //emmit event
    this.updateDashboad.emit()
  }

  async acceptInvitationButton(){
    //Go to listUsersPending2 and remove the user and add to listUsersConfirmed2
    console.log('Sure I wan tot go' + this.tripPlan.id)
    await this.acceptInvitation.accept(this.tripPlan.id)
    //emmit event
    this.updateDashboad.emit()
  }

  showTripDetails(){
    console.log('This trip details' +this.tripPlan.id)
  }

}
