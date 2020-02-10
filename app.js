var express = require("express")
var mongoose = require("mongoose")
var apiConfig = require("./apiconfig.json")
var bodyParser = require("body-parser")

var app = express()
app.use(bodyParser.json());

//import route
var routes = require(('./routes.js'))
app.use('/', routes)

//Db Login
mongoose.connect(apiConfig.dblink, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => handleError(error));
mongoose.connection.on('error', function(e) {
    console.log('RaidTrackerDB: Can not connect Error: ' + e);
});
mongoose.connection.once('open', function(d) { 
    console.log("\x1b[32mRaidTrackerDB:\x1b[0m connected to \x1b[31m" + mongoose.connection.host + " \x1b[0m");
})

// Create server
app.listen(3000)