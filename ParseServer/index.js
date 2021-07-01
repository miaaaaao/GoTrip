// Parser server configuration 

const express = require('express');
const ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
const path = require('path');
const args = process.argv || [];
const test = args.some(arg => arg.includes('jasmine'));
const SimpleSendGridAdapter = require('parse-server-sendgrid-adapter');

//const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;
const databaseUri = `mongodb+srv://goTripMongoAtlas:wf5vAe7sz7gfbrXh@cluster0.t1uau.mongodb.net/goTrip?retryWrites=true&w=majority`

var options = { allowInsecureHTTP: false };

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}
const config = {
  databaseURI: databaseUri,
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'GoTripAppID',
  masterKey: process.env.MASTER_KEY || '==HyUH78YT$5%33==*&99', 
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/api', // Don't forget to change to https if needed
  liveQuery: {
    classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
  },
  publicServerURL: 'https://goTrip.lucasdacosta.com/parse', // change by the Heroku url to make it able confirm and reset the email and password
  verifyUserEmails: true,
  appName: 'GoTrip',
  emailAdapter: SimpleSendGridAdapter({
    apiKey: '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',
    fromAddress: 'gotrip.helpcenter@gmail.com',
  })
};

const app = express();

//Dashboard configuration
var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": "http://localhost:1337/api",
      "appId": "GoTripAppID",
      "masterKey": "==HyUH78YT$5%33==*&99",
      "appName": "GoTrip",
      "iconName": "goTrip-logo.png",
    }
  ], 
  "iconsFolder": "icons"
}, options);

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/api';
if (!test) {
  const api = new ParseServer(config);
  app.use(mountPath, api);
}

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

const port = process.env.PORT || 1337;
if (!test) {
  const httpServer = require('http').createServer(app);
  httpServer.listen(port, function () {
    console.log('GoTrip server running on port ' + port + '.');
  });
  // This will enable the Live Query real-time server
  ParseServer.createLiveQueryServer(httpServer);
}

module.exports = {
  app,
  config,
};
