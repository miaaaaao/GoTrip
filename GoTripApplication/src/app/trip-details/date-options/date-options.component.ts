import { Component, Input, OnInit } from '@angular/core';
import { VoteDateService } from '../../services/vote-date.service';

@Component({
  selector: 'app-date-options',
  templateUrl: './date-options.component.html',
  styleUrls: ['./date-options.component.css']
})
export class DateOptionsComponent implements OnInit {
  @Input() currentTrip:any;

  constructor(private voteDateService: VoteDateService) { }

  ngOnInit(): void {
    console.log(this.currentTrip)
    if(!this.currentTrip){
      this.currentTrip = {
        status:{
          hasAcceptedInvitation: false
        },
        date:{
          one: {start: 0, end: 0},
          two: {start: 0, end: 0},
          three: {start: 0, end: 0},
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

  saveDatePreferences(option: string){
  
    this.voteDateService.voteDate(option)
  }

}
