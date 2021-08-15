import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-options',
  templateUrl: './budget-options.component.html',
  styleUrls: ['./budget-options.component.css']
})
export class BudgetOptionsComponent implements OnInit {
  @Input() currentTrip:any;

  constructor() { 
    
  }

  ngOnInit(): void {
   
  }

}
