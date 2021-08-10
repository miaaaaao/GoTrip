const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID);
sgMail.setSubstitutionWrappers('{{', '}}');

Parse.Cloud.define("sendInvitation", async (request)=>{
    let tripData = request.params;
    const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

    let listEmails = tripData.invitedFriends; // Array of emails
    let Sender_Name = tripData.ownerName // Get the user name
    let tripTitle = encodeURIComponent(tripData.title); // Remove empty space 
    let city = tripData.destination; // Get city name
    let month = new Date(tripData.date.one.start).getMonth(); // convert data into month
    let monthName = months[month]; // Get month name from months array

    let Weblink = `http://127.0.0.1:4200/invitation?tripOwner=${Sender_Name}#${tripTitle}#${city}#${monthName}`


    try{
        for (let i = 0; i < listEmails.length; ++i){
            await sgMail.send({
                to: listEmails[i].email,
                from: "info@go-trip.tech",
                templateId: 'd-f3029e2e94a048ee9087963e3dc1b497',
                dynamic_template_data: {Weblink, Sender_Name},
                //subject: "You was invited to a Trip",
                //text: `Checkout this link for more information: http://127.0.0.1:4200/invitation?tripOwner=${tripOwner}#${tripTitle}#${city}#${monthName}`
            })
        }
        
        

    }catch(err){
        console.log(err)
    }
    

})
