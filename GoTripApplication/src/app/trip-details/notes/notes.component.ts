import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';
import { TripDetailsComponent } from '../trip-details.component';
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
  newNoteText = ''
  currentUser = Parse.User.current();
  // tripId = Parse.TripsPlan.current();
  Note = Parse.Object.extend("Note");


  // Parse.Note.
  constructor() {

    this.notes = [];
    const query = new Parse.Query(this.Note);
    console.log(query)
    // query.get('')
  }
  notes: Array<Note>;


  ngOnInit(): void {
  }


  onKey(event: any) { // without type info
    // this.newNoteText = event.target.value
  }
  onClickMe() {
    const newNote = new this.Note();
    // check if User is logged in before submitting text
    newNote.set("user", 'sazzelz') // only for testing, delete when login works
    // newNote.set("user", this.currentUser)
    newNote.set("text", this.newNoteText)
    newNote.set("tripId",)
    newNote.set("createdAt", Date())

    var objectId = Notes.id;

    newNote.save()

    this.newNoteText = ''


  }

}


