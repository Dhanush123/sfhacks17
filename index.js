"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const Report = require('ga-report');

const restService = express();
restService.use(bodyParser.json());

// var report = new Report({'username':'jessegao12@gmail.com', 'password':'happyman'});
// report.once('ready', function() {
//   // ready to report
// });

var numNewUsers = 0;

var options = {
  'ids': 'ga:123456-UA',
  'start-date': '2017-1-01',
  'end-date': '2017-11-31',
  'metrics': 'ga:organicSearches,ga:percentNewSessions,ga:sessions,ga:avgSessionDuration,ga:newUsers,ga:1dayUsers,ga:30dayUsers,ga:7dayUsers,ga:pageviews'
};

var report;

restService.get("/", function (req, res) {
  console.log("hook request");
  try {
      console.log("req " + req);
      if (req) {
        if(req.qtype == "newusers"){
          report = new Report({'username':'jessegao12@gmail.com', 'password':'happyman'});
          newUsersFind(req, function(result) {
            console.log("inside callback");
                     //callback is ultimately to return Messenger appropriate responses formatted correctly
                       return res.json({
                         message: "You have " + numNewUsers + " new user(s)!"
                       });
                   });
        }
      }
  }
  catch (err) {
    console.error("Cannot process request", err);
    return res.status(400).json({
        status: {
            code: 400,
            errorType: err.message
        }
    });
  }
});

function newUsersFind(req,callback){
  console.log("inside nUF method");
  report.get(options, function(err, data) {
    console.log("inside callback of nUF");
    if (err) console.error(err);
    console.log(data);
    numNewUsers = data.totalsForAllResults["ga:newUsers"];
    callback();
  });
}
