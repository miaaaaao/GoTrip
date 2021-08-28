/*
* Fucntions ot be used on the page that show details about selected sights
*/
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoreInfoService {

  constructor() { }

  knowInfoAboutThisSight = {
    xid:'',
    sightServerId: '',
    name: '',
    urlImage: '',
    description: '',
    geoPoints: {
        lon: 0,
        lat: 0
    },
    hasAcceptedInvitation: false,
    isTheOwner: false,
    userVoted: false
  }

    /*
    * Save the sight selected in the details page in order to show in the page that shows more
    * information about the place.
    */
    moreInfoAboutSight(selectedSignht: any){
        this.knowInfoAboutThisSight.xid = selectedSignht.xid,
        this.knowInfoAboutThisSight.name = selectedSignht.name,
        this.knowInfoAboutThisSight.urlImage = selectedSignht.urlImage,
        this.knowInfoAboutThisSight.description = selectedSignht.description,
        this.knowInfoAboutThisSight.geoPoints.lon = selectedSignht.geoPoints.lon,
        this.knowInfoAboutThisSight.geoPoints.lat = selectedSignht.geoPoints.lat
        this.knowInfoAboutThisSight.hasAcceptedInvitation = selectedSignht.hasAcceptedInvitation
        this.knowInfoAboutThisSight.isTheOwner = selectedSignht.isTheOwner
        this.knowInfoAboutThisSight.userVoted = selectedSignht.userVoted
        this.knowInfoAboutThisSight.sightServerId = selectedSignht.sightServerId
    }

    /*
    * Clean the knowInfoAboutThisSight once the user leave the detils page
    */
    cleanMoreInfoAboutSight(){
        this.knowInfoAboutThisSight.xid = '',
        this.knowInfoAboutThisSight.name = '',
        this.knowInfoAboutThisSight.urlImage = '',
        this.knowInfoAboutThisSight.description = '',
        this.knowInfoAboutThisSight.geoPoints.lon = 0,
        this.knowInfoAboutThisSight.geoPoints.lat = 0,
        this.knowInfoAboutThisSight.hasAcceptedInvitation = false,
        this.knowInfoAboutThisSight.isTheOwner = false,
        this.knowInfoAboutThisSight.userVoted = false,
        this.knowInfoAboutThisSight.sightServerId = ''
    }
}
