var App = App || {};

//http://localhost:8080/get/traffic

App.DataManager = function(){

	var trafficDay, trafficWeek;
	
	var loadTraffic = function(selector, notify){
		console.log("LOADING");

		switch(selector) {
   		case "day":
			$.getJSON( "http://localhost:8080/get/trafficDay", function( data ) {
  			trafficDay = data;
  			notify();
			});
			        
		break
        case "week":
        	$.getJSON( "http://localhost:8080/get/trafficWeek", function( data ) {
  			trafficWeek = data;
  			notify();
			});
			
        break;
    	}
	};



	var getTrafficData = function(selector){
		switch(selector) {

   		case "day":
        	if(trafficDay != null){
				return trafficDay;
			}else{
				console.log("Loading error");
				return -1;
			}
        break
        case "week":
        	if(trafficDay != null){
				return trafficWeek;
			}else{
				console.log("Loading error");
				return -1;
			}
        break;
		}
	};


	return {
        loadTraffic: loadTraffic,
        getTrafficData: getTrafficData
    };
};