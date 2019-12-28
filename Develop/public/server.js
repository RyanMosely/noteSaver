

// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================



var express = require("express");
var path = require("path");
var fs = require("fs");
const http = require('http');
var appRoot = require('app-root-path');
let notesDB = require('./db.json');






console.log(__dirname + "/notes.html");




// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("assets/css/"));

//app.use(express.static(appRoot.resolve("public","assets")));

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

//require("./routes/apiRoutes")(app);
//require("./routes/htmlRoutes")(app);

//HTML ROUTERS

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
  console.log("howdyhowdyhowdy");
});


app.get("/api/notes", function (req, res) {
  fs.readFile(__dirname + '/noteSaver', "utf8", (err, data) => {
    if (err) throw err;  

    res.json(data);

  });
  // res.json
  res.sendFile(path.join(__dirname, "db.json"));
});


app.post("/api/notes", function (req, res) {
  // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
  // It will do this by sending out the value "true" have a table
  // req.body is available since we're using the body parsing middleware

  console.log(req.body);

  res.send(req.body);

  //res.sendFile(path.join(__dirname, "noteSaver"));  
/*
  fs.readFile(__dirname + '/db.json', "utf8", (err, data) => {
    if (err) throw err;

    fs.writeFile(data, JSON.stringify(req.body), function (err) {
      if (err) {
        return console.log(err);
      }
      //res.json(true);
      console.log("The file was saved!");
      //console.log(data);

      fs.readFile("./noteSaver", "utf8", (err, data) => {
        if (err) throw err;

        console.log(data);

        res.send(JSON.stringify(data));

      });

    });

  });
  */

});










app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
  return;
});


//API ROUTERS






// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
