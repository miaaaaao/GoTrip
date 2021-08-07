const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID);

Parse.Cloud.define("sendInvitation", async (request)=>{
    console.log("executando cloud function")
    console.log(request.user)
    let tripData = request.params;
    let user = request.user;

    let listEmails = tripData.invitedFriends; // Array of emails
    let tripOwner = 'John'//request.User; // Get the user name
    let tripTitle = encodeURIComponent(tripData.title); // Remove empty space 
    let city = tripData.destination; // Get city name
    let month = tripData.date.one.getMonth(); // convert data into month

    try{
        for (let i = 0; i < listEmails.length; ++i){
            await sgMail.send({
                to: listEmails[i].email,
                from: "info@go-trip.tech",
                subject: "You was invited to a Trip",
                text: `Checkout this link for more information: http://127.0.0.1:4200/invitation?tripOwner=${tripOwner}#${tripTitle}#${city}#${month}`
            })
        }
        
        

    }catch(err){
        console.log(err)
    }
    

})
