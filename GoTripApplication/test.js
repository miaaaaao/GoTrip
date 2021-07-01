var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var app = express();

let httpServer = require('http').createServer(app);

const PORT = process.env.PORT || 1337


var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev2', // Connection string for your MongoDB database
  cloud: './cloud/main.js', // Path to your Cloud Code
  appId: 'testId',
  masterKey: 'keyId', // Keep this key secret!
  //verifyUserEmails: true,
  fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:' + PORT +'/parse', // Don't forget to change to https if needed
  liveQuery: {
    classNames: ['Comments'],
  }
});

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

app.get('/home', (req,res)=>{
    res.send('Server ready to use')
});

app.get('/', function (req, res) {
    res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
  });


  httpServer.listen(PORT, function () {
    console.log('parse-server-example running on port ' + PORT + '.');
  });
  // This will enable the Live Query real-time server
  ParseServer.createLiveQueryServer(httpServer);

