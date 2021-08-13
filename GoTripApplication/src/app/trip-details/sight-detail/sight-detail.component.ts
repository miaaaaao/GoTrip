import { Component, OnInit, OnDestroy } from '@angular/core';

import { MoreInfoService } from '../../services/more-info.service';

@Component({
  selector: 'app-sight-detail',
  templateUrl: './sight-detail.component.html',
  styleUrls: ['./sight-detail.component.css']
})
export class SightDetailComponent implements OnInit, OnDestroy{
  sight: any = {}

  constructor(private  moreInfoService: MoreInfoService) {
    this.sight = this.moreInfoService.knowInfoAboutThisSight;
    console.log(this.sight)
   }

  ngOnInit(): void {
    
  }

  ngOnDestroy(){
    this.moreInfoService.cleanMoreInfoAboutSight()
  }

}
