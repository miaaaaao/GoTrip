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
   
  }

  saveBudgetPreferences(option:string){
    console.log('saving budget ' + option)
    this.voteBudgetService.voteBudget(option)
  }

}
