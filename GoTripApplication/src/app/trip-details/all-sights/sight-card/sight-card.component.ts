import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sight-card',
  templateUrl: './sight-card.component.html',
  styleUrls: ['./sight-card.component.css']
})
export class SightCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  /*
  * Vote will open a new page with extra infromation about the sight
  */
  openSightDetail(){
    console.log('Open datailpage')
    
  }
  /*
  * Vote will store the user in the Parse
  */
  vote(el:any){
    console.log('vote to visite')
    console.log(el)
    el.stopPropagation()
  }
  /*
  * Vote will store the sight information in the Parse
  */
  add(el:any){
    console.log('Add to map')
    el.stopPropagation()
  }

}
