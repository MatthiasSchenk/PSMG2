// ------------ DATA --------------

var data = [];
var dataLoaded = false;
var responseTraffic;
var TRAFFIC = 1;

var PORT = 8080;
var http = require ("http");
var express = require("express");
var cors = require("cors");
var server = express();

var dataManager;

exports.setManager = function(manager){
	dataManager = manager;
};



// ------------ Public Methods -----------

exports.dataComplete = function(dataIsComplete){
	dataLoaded = dataIsComplete;
	console.log("LOADING DONE");

	server.use(cors());

	server.listen(PORT, function () {
  	console.log("server started on port "+ PORT + "...");

	});

};

exports.setupServer = function() {




		// ----------- Private Methods ------------

		getTraffic = function(selector){

		switch(selector) {
            case "overall":
                var trafficOverall = dataManager.getTrafficOverall();
                return trafficOverall;
            break
	   		case "day":
	   			var trafficDay = dataManager.getTrafficDay();
				return trafficDay;
	        break
	        case "week":
	   			var trafficWeek = dataManager.getTrafficWeek();
				return trafficWeek;
	        break;

            
			}	
		};



		// ------------ REQUESTS -------------

		server.get("/get/data", function (request, response) {
			console.log("DATA REQUESTED");

			if(!dataLoaded){
     			response.send("Data still Loading, please wait...");
     		}else{
            	response.send(getData);
            };            
        });

        server.get("/get/trafficOverall", function (request, response) {
            console.log("TRAFFIC OVERALL REQUESTED");

            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

            if(!dataLoaded){
                response.send("Data still Loading, please wait...");
            }else{
                response.send(getTraffic("overall"));
            };      
        });

     	server.get("/get/trafficDay", function (request, response) {
     		console.log("TRAFFIC DAY REQUESTED");

     		response.header("Access-Control-Allow-Origin", "*");
  			response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

     		if(!dataLoaded){
     			response.send("Data still Loading, please wait...");
     		}else{
            	response.send(getTraffic("day"));
     		};		
        });

        server.get("/get/trafficWeek", function (request, response) {
     		console.log("TRAFFIC WEEK REQUESTED");

     		response.header("Access-Control-Allow-Origin", "*");
  			response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

     		if(!dataLoaded){
     			response.send("Data still Loading, please wait...");
     		}else{
            	response.send(getTraffic("week"));
     		};		
        });

};


