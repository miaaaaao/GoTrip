import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';
import { getTripDetails } from '../../services/getTripDetails.service';

import { ActivatedRoute, Router } from '@angular/router';

interface Note {
  text: string;
  user: string;
  createdAt: Date;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})


export class NotesComponent implements OnInit {
  newNoteText = '';
  currentUser = Parse.User.current();
  tripId: string = '';
  Note = Parse.Object.extend("Note");
  query = new Parse.Query('Note');
  subscription = this.query.subscribe();





  constructor(private getTripDetails: getTripDetails) {

    this.tripId = getTripDetails.currentTrip.id

    this.notes = [];

    console.log(this.query)


  }



  notes: Array<Note>;


  ngOnInit(): void {
  }


  onKey(event: any) { // without type info
    this.newNoteText = event.target.value
  }
  onClickMe() {
    const newNote = new this.Note();
    // TODO: check if User is logged in before submitting text
    newNote.set("user", this.currentUser?.id)
    newNote.set("text", this.newNoteText)
    newNote.set("tripId", this.tripId)
    newNote.set("createdAt", Date())
    newNote.save()
  }



}


