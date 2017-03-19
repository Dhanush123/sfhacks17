"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
// const Report = require("ga-report");

const restService = express();
restService.use(bodyParser.json());

// var report;
// report.once("ready", function() {
//   console.log("authenticated now!!!!");
// });

var numNewUsers = 0;

// var options = {
//     "ids": "ga:123456-UA",
//     "start-date": "2017-1-01",
//     "end-date": "2017-11-31",
//     "metrics": "ga:organicSearches,ga:percentNewSessions,ga:sessions,ga:avgSessionDuration,ga:newUsers,ga:1dayUsers,ga:30dayUsers,ga:7dayUsers,ga:pageviews"
// };

restService.get("/", function(req, res) {
    console.log("hook request");
    try {
        if (req) {
            if (req.query.qtype == "newusers") {
                newUsersFind(req, function(result) {
                   console.log("in callback???");
                    //callback is ultimately to return Messenger appropriate responses formatted correctly
                    return res.json({
                        message: "You have " + numNewUsers + " new user(s)!"
                    });
                });
            }
        }
    } catch (err) {
        console.error("Cannot process request", err);
        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

function newUsersFind(req, callback) {
    // report.get(options, function(err, data) {
    //     if (err){
    //       console.error("err!!!! " + err);
    //     }
    //     else{
    //     console.log(data);
    //     numNewUsers = data.totalsForAllResults["ga:newUsers"];
    //     callback();
    //   }
    // });

        var options = { method: 'GET',
      url: 'https://www.googleapis.com/analytics/v3/data/ga',
      qs:
       { ids: 'ga:143226565',
         'start-date': '2017-03-18',
         'end-date': '2017-03-19',
         metrics: 'ga:newUsers,ga:sessions,ga:bounceRate,ga:sessionDuration,ga:pageviews',
         access_token: 'ya29.GlwTBPfQhyOyVqQ4h9O_JERzrBi15QEQfeoGJ4M5dC_oQkV-LfQAt9nHmzUCYD_mAbJDuD6wX5YRzlKF1ccx5kezx7QZf7M872IHtKCtufl4dpBHA1NpX6HU6-MvpA' },
      headers:
       { 'postman-token': '175af880-f129-9e74-69eb-24761a442950',
         'cache-control': 'no-cache' } };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      //console.log(body);
      console.log(JSON.parse(body)["totalsForAllResults"]);
      numNewUsers = JSON.parse(body)["totalsForAllResults"]["ga:newUsers"];
      console.log("numNewUsers: "+numNewUsers);
      callback();
    });
}

restService.listen((process.env.PORT || 8000), function() {
    console.log('Server listening');
    // report = new Report({
    //     "username": "jessegao",
    //     "password": "happyman"
    // });
});
