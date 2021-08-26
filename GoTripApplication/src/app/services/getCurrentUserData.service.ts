/*
* This is a service to get current user data e.g., name, etc from parse. To
* keep it in a centralized place
*/
import * as Parse from 'parse';

export class currentUser {
    name:string = '';
    userId = '';

    async getCurrentUser(){
        const currentUser = Parse.User.current();
        if(currentUser){
            console.log(currentUser)
            let username = await currentUser.get('username');
            this.name = username;
            this.userId = currentUser.id
        }
    }
}
