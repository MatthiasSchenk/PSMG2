//ID,Zeitstempel,Name,IP-Adresse,Kurs-ID,Kontext,Kontext-ID,Aktion,URL, Datum

var dataLoaded = false;
var organizedData = [];
var dataArr = [];

var loadingCounter = 0;

var traffic = [];
var trafficOverall = [];
var trafficDay = [];
var trafficWeek = [];
var trafficMonth = [];




exports.getTraffic = function(){
	return traffic;
};

exports.getTrafficOverall = function(){
	return trafficOverall;
};

exports.getTrafficDay = function(){
	return trafficDay;
};

exports.getTrafficWeek = function(){
	return trafficWeek;
};


exports.setupData = function(notifyDataLoaded){
	
console.log("loading Data...");

//Variables

var NUM_DATA_FILES = 2;
var dataNum = 0;
var fileNames = [];
var loadedFiles = [];

for (var i = 0; i < NUM_DATA_FILES; i++) {
	loadedFiles[i] = false;
};



// Methods

var createFileNames = function(){


	for (var i = 1 ; i <= NUM_DATA_FILES; i++) {
		//fileNames[i] = ("./GRIPS Daten/TestData/TestDaten7.JSON");
		//fileNames[i] = ("./GRIPS Daten/TestData/TestDaten" + i);

		fileNames[i] = ("./GRIPS Daten/DataJSON/TeilDaten" + i + ".JSON");
		//fileNames[i] = ("./GRIPS Daten/TeilDaten" + i + ".csv");
	};
};

var buildSingleArray = function(){




	for (var i = 0; i < NUM_DATA_FILES; i++) {
			addFileData(i);
	};
};

var checkData = function(){
	for (var i = 1; i < loadedFiles.length; i++) {
		if(loadedFiles[i] != true){
			return false;
		}
	};

	if(loadingCounter == NUM_DATA_FILES){
		return true;
	};
		
};



var addFileData = function(fileNum){
	//console.log(fileNum);
	for (var i = 0; i < dataArr[fileNum].length; i++) {
			organizedData.push(dataArr[fileNum][i]);

		};
};

var convertTimeStamps = function(){
var date, hours, minutes, seconds; 

	for(var i = 0; i < organizedData.length;i++){
		date = new Date(organizedData[i].Zeit*1000);
		hours = date.getHours();
		minutes = "0" + date.getMinutes();
		seconds = "0" + date.getSeconds();

		organizedData[i].Datum = date;
	}
};

var convertToJSON = function(fileName, targetName) {

	console.log(fileName);

	var Converter = require("csvtojson").core.Converter;
	var fs = require("fs");
	var csvConverter = new Converter({constructResult:false});
	var fileStream = fs.createReadStream(fileName);

	var writeStream=fs.createWriteStream(targetName);
	fileStream.pipe(csvConverter).pipe(writeStream);

	csvConverter.on("end_parsed",function(jsonObj){
    console.log("Done");
	});


}; 

var parseJsonObj = function(obj){
	var fs = require('fs');
	var result;
  		
 		result = JSON.parse(obj);
	
	

	return result;
};

var filterTrafficData = function(){
		filterLogins();
		createOverallLogins();
		filterDay();
		filterWeek();

	};

var createOverallLogins = function(){
	var tempDay = traffic[0].getDay();
	var counter = 1;
	for (var i = 0; i < traffic.length; i++) {
		if (traffic[i].getDay() == tempDay) {
			counter++;	
		}else{
			trafficOverall.push(
				{date: traffic[i-1], logins: counter}
				);
			counter = 1;
			tempDay = traffic[i].getDay();
		}
	};


	var tempArr = [];
	var tempArr2 = [];
	var hash;
	for (var i = 0; i < trafficOverall.length; i++) {
		hash = ""+trafficOverall[i].date.getDate()+"."+ trafficOverall[i].date.getMonth();
		if(tempArr2.indexOf(hash) == -1){
			tempArr.push({day: trafficOverall[i].date.getDate() +"."+ trafficOverall[i].date.getMonth() +"."+trafficOverall[i].date.getFullYear(), logins: trafficOverall[i].logins});
			tempArr2.push(hash);
			
		}else{
			tempArr[tempArr2.indexOf(hash)].logins += trafficOverall[i].logins;
		}	
	};

	trafficOverall = tempArr;
}



var filterWeek = function(){
	var counter = 0;
	for (var i = 0; i < 7; i++) {
		for (var j = 0; j < traffic.length; j++) {
			if (traffic[j].getDay() == i) {
				counter++;	
			};
		};
		trafficWeek.push(
			{wDay: "", day: i, logins: counter}
		);
		counter = 0;
	};

trafficWeek[0].wDay = "Sonntag";
trafficWeek[1].wDay = "Montag";
trafficWeek[2].wDay = "Dienstag";
trafficWeek[3].wDay = "Mittwoch";
trafficWeek[4].wDay = "Donnerstag";
trafficWeek[5].wDay = "Freitag";
trafficWeek[6].wDay = "Samstag";

};

var filterDay = function(){
		var counter = 0;
			for (var i = 0; i < 24; i++) {
				for (var j = 0; j < traffic.length; j++) {
					if (traffic[j].getHours() == i) {
						counter++;	
					};
				};
				trafficDay.push(
					{hour: i, logins: counter}
				);
				counter = 0;
			};
};

var filterLogins = function(){
	for (var i = 0; i < organizedData.length; i++) {
			if(organizedData[i].Aktion == "login"){
				traffic.push(organizedData[i].Datum);
			};
		};
};



var loadData = function(fileName, num){
	
 	
	var fs = require('fs');
	var objArr = [];
	fs.readFile(fileName, "utf8", function (err, data) {
  	if (err) throw err;

 

  	var arr = data.split("|");
  	var jsonArr = [];

  	for (var i = 0; i < arr.length; i++) {  		 
		jsonArr[i] = parseJsonObj(arr[i]);
  	};

	dataArr[num-1] = jsonArr;
  	loadedFiles[num-1] = true;
  	loadingCounter++;
  	console.log("File " + loadingCounter + " of " + NUM_DATA_FILES + " read");
  	
  	if(checkData() == true) {
  		console.log("organizeData...");
			organizeData();
		};
	});
};


var load = function(){
	for (var i = 1; i <= NUM_DATA_FILES; i++) {
		loadData(fileNames[i], i);
	};
};

var getVariants = function(){
var fs = require('fs');

	console.log("getVariants")
	var possibleActions = [""];
	var possibleContexts = [""];
	for(var i = 0; i < organizedData.length; i++){
			for (var j = 0; j < possibleContexts.length; j++) {
				if(possibleContexts.indexOf(organizedData[i].Kontext) == -1){
				possibleContexts.push(organizedData[i].Kontext);
				console.log(possibleContexts[possibleContexts.length - 1]);
				console.log(organizedData[i].Kontext);
			};
		};	
	};

	fs.writeFile("./GRIPS Daten/Kontext", possibleContexts , function(err) {
    				if(err) {
     	   				return console.log(err);
    				}	
	}); 

	
		
};

var loadURL = function(URL, kontext){
	var fullURL = "https://elearning.uni-regensburg.de/" + kontext +"/"+ URL;
	
	var request = require("request");
	request(fullURL, function(error, response, body) {
  	console.log(body);
  	return body;
	});
};

var loadAdditionalURLInfo = function(){
	// 1 STATT organizedData.length !!!!!!
	for(var i = 0; i < 1; i++){
		var html = loadURL(organizedData[i].URL, organizedData[i].Kontext);
		loadCourseName(html);
	};



	
};

var loadCourseName = function(html){
	// GREIFE NAMEN AUS DEM HTML STRING AB
	var jsdom = require("node-jsdom");
 
	jsdom.env(
  		'<p><a class="the-link" href="https://github.com/tmpvar/jsdom">jsdom!</a></p>',
  		["http://code.jquery.com/jquery.js"],
  		function (errors, window) {
    		console.log("contents of a.the-link:", window.$("a.the-link").text());
  		}
	);
};

var reWriteDataToJSON = function(){
	for (var i = 1; i <= NUM_DATA_FILES; i++) {
		convertToJSON(fileNames[i], "./GRIPS Daten/TeilDaten" + i + ".JSON");
	};
};

var organizeData = function(){
	
	buildSingleArray();
	convertTimeStamps();
	filterTrafficData();
	//loadAdditionalURLInfo();



	//getVariants();

	dataLoaded = true;
	notifyDataLoaded(dataLoaded);

};



// --------------------------------------------------------

createFileNames();
load();

//reWriteDataToJSON();







};


