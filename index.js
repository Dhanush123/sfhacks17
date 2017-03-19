"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const restService = express();
restService.use(bodyParser.json());

var numNewUsers = 0;
var numSessions = 0;
var numPageViews = 0;
var avgSessDur = 0;
var avgPageDur = 0;
var att = 'ya29.GlwTBPRC1cZE83DuhhvqhUAAm1iyxEZYFyNz_K_ZFz1uLbQH6CCFXJJhtOC4-E2UL6z5F_ZX2NQ8XXpzxO9_of9OHsqvaiEgs1MTYeki2C1fF12r3CVtyfNCWeNenA';

restService.get("/", function(req, res) {
    console.log("hook request");
    try {
        if (req) {
            if (req.query.qtype == "newusers") {
                newUsersFind(req, function(result) {
                  var msg = "You have " + numNewUsers + " new users!";
                   console.log("in callback??? " + msg);

                    //callback is ultimately to return Messenger appropriate responses formatted correctly
                    return res.json({
                        message: msg
                    });
                });
            }
            else if (req.query.qtype == "numsessions") {
                numSessionsFind(req, function(result) {
                  var msg = "You have " + numSessions + " total sessions!";
                   console.log("in callback2??? " + msg);

                    //callback is ultimately to return Messenger appropriate responses formatted correctly
                    return res.json({
                        message: msg
                    });
                });
            }
            else if (req.query.qtype == "numpageviews") {
                numPageViewsFind(req, function(result) {
                  var msg = "You have " + numPageViews + " total page views!";
                   console.log("in callback3??? " + msg);

                    //callback is ultimately to return Messenger appropriate responses formatted correctly
                    return res.json({
                        message: msg
                    });
                });
            }
            else if (req.query.qtype == "avgsessdur") {
                numAvgSessDurFind(req, function(result) {
                  var msg = "Your site's average session duration is: " + avgSessDur + " seconds.";
                   console.log("in callback4??? " + msg);

                    //callback is ultimately to return Messenger appropriate responses formatted correctly
                    return res.json({
                        message: msg
                    });
                });
            }
            else if (req.query.qtype == "avgpagedur") {
                numAvgPageDurFind(req, function(result) {
                  var msg = "The average time a user stays on a page on your site is: " + avgPageDur + " seconds.";
                   console.log("in callback5??? " + msg);

                    //callback is ultimately to return Messenger appropriate responses formatted correctly
                    return res.json({
                        message: msg
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
    var options = { method: 'GET',
    url: 'https://www.googleapis.com/analytics/v3/data/ga',
    qs:
    { ids: 'ga:143226565',
     'start-date': '2017-03-18',
     'end-date': '2017-03-19',
     metrics: 'ga:newUsers,ga:sessions,ga:bounceRate,ga:sessionDuration,ga:pageviews',
     access_token: att }
    };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(JSON.parse(body)["totalsForAllResults"]);
      numNewUsers = JSON.parse(body)["totalsForAllResults"]["ga:newUsers"];
      console.log("numNewUsers: "+numNewUsers);
      callback();
    });
}

function numSessionsFind(req, callback) {
    var options = { method: 'GET',
    url: 'https://www.googleapis.com/analytics/v3/data/ga',
    qs:
    { ids: 'ga:143226565',
     'start-date': '2017-03-18',
     'end-date': '2017-03-19',
     metrics: 'ga:newUsers,ga:sessions,ga:bounceRate,ga:sessionDuration,ga:pageviews',
     access_token: att }
    };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(JSON.parse(body)["totalsForAllResults"]);
      numNewUsers = JSON.parse(body)["totalsForAllResults"]["ga:sessions"];
      console.log("numSessionsFind: "+numNewUsers);
      callback();
    });
}

function numPageViewsFind(req, callback) {
    var options = { method: 'GET',
    url: 'https://www.googleapis.com/analytics/v3/data/ga',
    qs:
    { ids: 'ga:143226565',
     'start-date': '2017-03-18',
     'end-date': '2017-03-19',
     metrics: 'ga:newUsers,ga:sessions,ga:bounces,ga:avgSessionDuration,ga:organicSearches,ga:pageviews,ga:avgTimeOnPage',
     access_token: att }
    };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(JSON.parse(body)["totalsForAllResults"]);
      numNewUsers = JSON.parse(body)["totalsForAllResults"]["ga:pageviews"];
      console.log("numPageViewsFind: "+numNewUsers);
      callback();
    });
}

function numAvgSessDurFind(req, callback){
  var options = { method: 'GET',
  url: 'https://www.googleapis.com/analytics/v3/data/ga',
  qs:
  { ids: 'ga:143226565',
   'start-date': '2017-03-18',
   'end-date': '2017-03-19',
   metrics: 'ga:newUsers,ga:sessions,ga:bounces,ga:avgSessionDuration,ga:organicSearches,ga:pageviews,ga:avgTimeOnPage',
   access_token: att }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(JSON.parse(body)["totalsForAllResults"]);
    numNewUsers = JSON.parse(body)["totalsForAllResults"]["ga:avgSessionDuration"];
    console.log("avgSessionDuration: "+numNewUsers);
    callback();
  });
}

function numAvgPageDurFind(req, callback){
  var options = { method: 'GET',
  url: 'https://www.googleapis.com/analytics/v3/data/ga',
  qs:
  { ids: 'ga:143226565',
   'start-date': '2017-03-18',
   'end-date': '2017-03-19',
   metrics: 'ga:newUsers,ga:sessions,ga:bounces,ga:avgSessionDuration,ga:organicSearches,ga:pageviews,ga:avgTimeOnPage',
   access_token: att }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(JSON.parse(body)["totalsForAllResults"]);
    numNewUsers = JSON.parse(body)["totalsForAllResults"]["ga:avgTimeOnPage"];
    console.log("avgTimeOnPage: "+numNewUsers);
    callback();
  });
}

function setGreetingText() {
  var greetingData = {
    setting_type: "greeting",
    greeting:{
      text:"Hi {{user_first_name}}, welcome! You can ask for Google Analytics stats about your website!"
    }
  };
  createGreetingApi(greetingData);
}

restService.listen((process.env.PORT || 8000), function() {
    console.log('Server listening');
});
