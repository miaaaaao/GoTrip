import { Component, OnInit } from '@angular/core';
import {germany} from './cities/germany'

@Component({
  selector: 'app-new-trip-form',
  templateUrl: './new-trip-form.component.html',
  styleUrls: ['./new-trip-form.component.css']
})
export class NewTripFormComponent implements OnInit {

  selectedCity: number = 0;

  cities:{id:Number, name:String}[] = [];

  constructor() {
    for(let i =0; i<germany.length; i++){
      this.cities.push({
        id: i+1,
        name: germany[i]
      })
    }
   }

  ngOnInit(): void {
    
    
  }

}
