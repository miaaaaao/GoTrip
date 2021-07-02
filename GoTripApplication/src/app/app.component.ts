import { Component, OnInit } from '@angular/core';
import {environment} from '../environments/environment';
import * as Parse from 'parse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'GoTrip';

  constructor(){
    Parse.initialize(environment.serverId, environment.serverMasterKey);
    (Parse as any).serverURL = environment.serverUrl;
   
  };

  ngOnInit(){


  
  }
}
