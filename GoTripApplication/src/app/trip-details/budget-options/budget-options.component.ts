import { Component, Input, OnInit } from '@angular/core';

import { VoteBudgetService } from '../../services/vote-budget.service';

@Component({
  selector: 'app-budget-options',
  templateUrl: './budget-options.component.html',
  styleUrls: ['./budget-options.component.css']
})
export class BudgetOptionsComponent implements OnInit {
  @Input() currentTrip:any;

  constructor(private voteBudgetService: VoteBudgetService) { 
    
  }

  ngOnInit(): void {
    if(!this.currentTrip){
      this.currentTrip = {
        status:{
          hasAcceptedInvitation: false
        },
        invitedFriends: [],
        budget:{
          userVotedOn: 0,
          totalVote: {
            one: 0,
            two: 0,
            three: 0
          }
        }
      }
    }
  }

  saveBudgetPreferences(option:string){
    
    this.voteBudgetService.voteBudget(option)
  }

}
