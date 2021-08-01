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
    //Save in the class TripPlan: city, listUsersPending, finished = false, owner ID, title

      //Check if there is an user with the emails informed. If yes, add them in the listUsersPendind.

    //Save the friends invited who does not have account in the class nonUserInvited: Email and tripsPlanId

    //Save budget options in the class Budget: tripsPlanId, budgetOne, budgetTwo, budgetThree

    //Save dates options in the class Date: tripsPlanId, dataOneStart, dataOneEnd, dataTwoStart, dataTwoEnd, dataThreeStart, dataThreeEnd

    //Send email to invited friends
    
  }

}