class CurrentTripModel {
    title: String = '';
    city: String = '';
    date: String = '';
    owner: String = '';

    constructor(title: string, city: String, date: String, owner: String){
        this.title = title;
        this.city = city;
        this.date = date;
        this.owner = owner;
    }
}

export class getTrip {
    currentTrips:{}[] = [
        new CurrentTripModel('Summer Trip', 'Siegen', 'TBC', 'You'),
        new CurrentTripModel('Winter Trip', 'Berlin', 'TBC', 'Anna'),
    ];

    oldTrips:{}[] = [
        new CurrentTripModel('Sprint', 'Koln', 'Nov 2020', 'You'),
    ];

};