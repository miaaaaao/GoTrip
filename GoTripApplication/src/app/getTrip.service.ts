import * as Parse from 'parse';

class TripModel {
    id: String = '';
    title: String = '';
    city: String = '';
    date: String = '';
    owner: String = '';
    acceptedInvitation: Boolean = true;

    constructor(id: String, title: String, city: String, date: String, owner: String, acceptedInvitation: Boolean){
        this.title = title;
        this.city = city;
        this.date = date;
        this.owner = owner;
        this.acceptedInvitation = acceptedInvitation;
    }
}

export class getTrip {
    currentTrips:{}[] = [];
    oldTrips:{}[] = [];

    async fetchParseData(){
        console.log('connected')
        //Creating a temporary user --> Change it for current.user
        const user = new Parse.User();
        user.id = "dffCspAh6G";
        
        //Search for the current user's data
        const planOwner = new Parse.Query('TripsPlan');
        planOwner.equalTo("owner", user);

        const planInvited = new Parse.Query('TripsPlan');
        planInvited.equalTo("listUsersPending", user);

        const planInvitationConfirmed = new Parse.Query('TripsPlan');
        planInvitationConfirmed.equalTo("listUsersConfirmed", user);

        const mainQuery = Parse.Query.or(planOwner, planInvited, planInvitationConfirmed);

        const results = await mainQuery.find();
        
        // Do something with the returned Parse.Object values
        for (let i = 0; i < results.length; i++) {
            const object = results[i];
            //Check of the trip was finished
            let status = object.get('finished');
            //Get the date linked to this trip
            let data = 'TBC';
            //Get the owner name linked to this trip
            let owner = object.get('owner')
            if(owner.id == user.id){
                owner = 'You'
            }else{
                //Search the owner's name
                const findOwnerName = new Parse.Query(Parse.User);
                findOwnerName.equalTo("objectId", owner.id);
                const ownerResult = await findOwnerName.first();
                owner = ownerResult?.get('username');
            }
            //Check if invitaion was accepted
            let acceptedInvitation = object.get('listUsersConfirmed');
            console.log(acceptedInvitation)
            acceptedInvitation = acceptedInvitation !== undefined ? true : false;
            console.log(acceptedInvitation)

            let trip = new TripModel(object.id, object.get('title'), object.get('city'), data, owner, acceptedInvitation);
            if(status){
                //Trip finished
                this.oldTrips.push(trip);
            }else{
                this.currentTrips.push(trip)
            }
          }
    }

};