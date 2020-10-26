const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// connecting to the database
mongoose.connect(dbConfig.url,{
    useNewUrlParser : true
}).then(() => {
    console.log('Successfully connected to the database');
}).catch( err => {
    console.log('Could not connect to the database now... ' + err);
    process.exit();
});
 
 
  
// create express app
const app = express();
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// define a simple route 
app.get('/',(req,res) => {
    res.json({'message': 'welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.'});

});

// Require Notes routes
require('./app/routes/node-routes.js')(app);
require('./app/routes/hero-routes.js')(app);

// listen for requests
app.listen(1000, () => {
    console.log('Server is listening on port 1000!');
});

