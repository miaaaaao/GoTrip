const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID);

Parse.Cloud.define("sendInvitation", async (request, response)=>{
    console.log("executando cloud function")
    console.log(request.User)
    let tripData = request.params.formData;

    let listEmails = tripData.invitedFriends; // Separate the arrays
    let tripOwner = 'John'//request.User; // Get the user name
    let tripTitle = encodeURIComponent(tripData.title);
    let city = 'Siegen' //tripData.destination;
    let month = 'October' //tripData.date.one; // convert data into month

    try{
        for (let i = 0; i < listEmails.length; ++i){
            await sgMail.send({
                to: listEmails[i].email,
                from: "info@go-trip.tech",
                subject: "You was invited to a Trip",
                text: `Checkout this link for more information: http://127.0.0.1:4200/invitation?tripOwner=${tripOwner}#${tripTitle}#${city}#${month}`
            }).then(el=>response.success("Email sent"))
        }
        
        

    }catch(err){
        response.error(err)
    }
    

})
