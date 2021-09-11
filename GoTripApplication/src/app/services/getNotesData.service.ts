import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { currentUser } from './getCurrentUserData.service';
import * as Parse from 'parse';

class Note {
    public body: String = "";
    public user: String = "";
    public me: Boolean = false;

    constructor() {
    }

}

@Injectable()
export class noteService {
    private subscription: any


    constructor(private currentUser: currentUser) {
        // if (!this.subscription) {
        //     this.subscription = new Parse.Query('Notes');
        // }
        // // this.newsQuery.equalTo('title', 'broadcast');
        // return this.subscription.subscribe();
    }



    startToUpdate(): Observable<string> {
        return new Observable(observer => {
            this.subscription.on('create', (news: any) => {
                let note: Note = new Note()
                // TODO: it's not possible to get other user's info
                let user = news.get('user')
                let from = news.get('from')
                note.body = news.get('note')
                note.user = from != null ? from : 'Anonymous'
                note.me = user != null ? (user.id === this.subscription.currentUser.id) : false
                // console.log(note)
                // observer.next(note)
            })
            // TODO: other events
            // this.subscription.on('update', (news) => {
            //   this.zone.run(()=> {
            //     this.title = news.get('note')
            //   })
            // })
        })
    }

    stopUpdate() {
        this.subscription.unsubscribe()
    }

    public sendNote(note: string): Observable<boolean> {
        // TODO: change the object to note or something else later
        var News = Parse.Object.extend("News");
        var news = new News();

        news.set("note", note);
        news.set("user", currentUser);
        // news.set("from", Parse.User.current().get('username'))

        return new Observable(observer => {
            news.save(null, {
                success: (result: any) => {
                    observer.next(true)
                    observer.complete()
                },
                error: (error: string) => {
                    observer.error(error)
                }
            })
        })
    }
}

