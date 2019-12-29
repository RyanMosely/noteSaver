const fs = require('fs')
const notesDB = require("./db/db.json");



module.exports = function(app) {

    function writeNote(note){
        
        note = JSON.stringify(note);
        console.log (note);
       
        fs.writeFileSync(__dirname + "/db/db.json", note, function(err){
            if (err) {
                return console.log(err);
            }
        });
    }



    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
  
    app.get("/api/notes", function(req, res) {

       res.json(notesDB);
    
    });
  

/*    

    app.get("/api/waitlist", function(req, res) {
      res.json(waitListData);
    });
  
    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------
  */
    app.post("/api/notes", function(req, res) {
      // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
      // It will do this by sending out the value "true" have a table
      // req.body is available since we're using the body parsing middleware
     
     
      
      if (notesDB.length == 0){
        req.body.id = 0;
    } else{
        req.body.id = (notesDB[notesDB.length - 1].id) + 1;
    }
    
     
    console.log(req.body);



    

   notesDB.push(req.body);

  
   writeNote(notesDB);
   console.log(notesDB);

  
   res.json(req.body);
    });
  

app.delete("/api/notes/:id", function(req, res){
        
    
    let id = req.params.id.toString();
    console.log(id);


    for (i=0; i < notesDB.length; i++){
       
        if (notesDB[i].id == id){
           
            res.send(notesDB[i]);

          
            notesDB.splice(i,1);
            break;
        }
    }

    // Write notes data to database
    writeNote(notesDB);

});

  };
  