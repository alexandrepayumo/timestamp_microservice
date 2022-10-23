// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res) => {
  currentTime = new Date();
  milliseconds = currentTime.getTime();
  res.json({unix: milliseconds, utc: currentTime.toUTCString()});
});
//For some reason adding the above code makes the route for when milliseconds are given not work
//Nevermind it is not the code above

app.get("/api/:date", function(req, res) {
  var { date } = req.params;
  //we need the condition below to take into account if it is a milliseconds... ok seems to work now
  if (!Date.parse(date) && !parseInt(date)) {
    res.json({ error: "Invalid date" });
  }
  else if (Date.parse(date)) {
    //var unixDate = new Date(date.slice(0,4),date.slice(5,7)-1,date.slice(8));
    //var milliseconds = unixDate.getTime();
    var milliseconds = Date.parse(date);
    //var unixDate = new Date(milliseconds);
    var unixDate = new Date(date);
    res.json({unix: milliseconds, utc: unixDate.toUTCString()});
  }
  else {
    var milliseconds = parseInt(date);
    var unixDate = new Date(milliseconds);
    res.json({unix: milliseconds, utc: unixDate.toUTCString()});
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
