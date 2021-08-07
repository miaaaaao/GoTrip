const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID);

Parse.Cloud.define('sendInvitation', async (request)=>{
    let tripData = request.formData;
    let listEmails = 'lukancosta@hotmail.com'//tripData.invitedFriends; // Separate the arrays
    let tripOwner = 'John'//request.User; // Get the user name
    let tripTitle = 'Summer trip' //tripData.title;
    let city = 'Siegen' //tripData.destination;
    let month = 'October' //tripData.date.one; // convert data into month

    sgMail.send({
        to: listEmails,
        from: "info@go-trip.tech",
        subject: "You was invited to a Trip",
        text: `Checkout this link for more information: http://127.0.0.1/invitation?tripOwner=${tripOwner}#${tripTitle}#${city}#${month}`
    })

})
