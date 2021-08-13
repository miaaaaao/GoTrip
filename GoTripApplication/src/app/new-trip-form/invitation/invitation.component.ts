import { Component, Input, OnInit } from '@angular/core';
import {createNewTrip} from '../../services/newTripForm.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {
  @Input('data') data:any;
  constructor(private createNewTrip: createNewTrip) { }

  ngOnInit(): void {
  }

  deleteEmail(){
    this.createNewTrip.deleteInvitation(this.data.id)
    console.log('email deleted')
  }

}
