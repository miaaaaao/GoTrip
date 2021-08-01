export class createNewTrip {
    invitedFriends: {email:String, id:String}[] = [];

    invite(el:any){
        this.invitedFriends.push({
          email: el,
          id: (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
        });
      }

    deleteInvitation(key: String) {
      this.invitedFriends.forEach((value,index)=>{
          if(value.id==key) this.invitedFriends.splice(index,1);
      });
  } 

  saveTripOnParse(formData:{}){
    console.log(formData)
  }

}