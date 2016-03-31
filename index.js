// Hello Meets Backend based on Parse

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var secrets = require('./secrets.json')


var api = new ParseServer({
  databaseURI: 'mongodb://' + secrets.dbUser +':' + secrets.dbPassword +'@localhost:27017/parse',
  //cloud: __dirname + '/cloud/main.js',
  appId: 'hellomeets-backend',
  masterKey: secrets.masterKey, //Add your master key here. Keep it secret!
  serverURL: 'http://localhost:1337/parse'  // Don't forget to change to https if needed
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var parseApiPath = '/parse';
app.use(parseApiPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('Make sure to star the parse-server repo on GitHub!');
});


var port = 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
