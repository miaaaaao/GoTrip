import { Component, OnInit, NgZone } from '@angular/core';
import * as Parse from 'parse';
import { getTripDetails } from '../../services/getTripDetails.service';

import { ActivatedRoute, Router } from '@angular/router';
import { noteService } from 'src/app/services/getNotesData.service';

interface Note {
  text: string;
  user: string;
  createdAt: Date;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  newNoteText = '';
  currentUser = Parse.User.current();
  tripId: string = '';
  notes: any[] = []
  noteValue = ""
  Note = Parse.Object.extend("Note"); // for creating Notes
  // query = new Parse.Query('Note'); // query for notes array 
  // subscription: any = ''// probably not possible but will try first 


  constructor(private getTripDetails: getTripDetails, private noteSvc: noteService, private zone: NgZone) {

    // this.tripId = getTripDetails.currentTrip.id

  }

  ngOnInit() {
    this.noteSvc.startToUpdate()
      .subscribe(note => {
        this.zone.run(() => {
          this.notes.unshift(note)
        })
      })
  }
  ngOnDestroy() {
    this.noteSvc.stopUpdate()
  }

  sendNote(note: string) {
    this.noteSvc.sendNote(note)
      .subscribe(success => {

      }, error => {
        alert(error)
      }, () => {
        this.noteValue = ''
      })
  }

  getNoteClass(note: any) {
    if (note.me) {
      return 'right'
    } else {
      return 'left'
    }
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


