


var App = {
    init: function() {
        var loadingComplete = false;

    	var dataManager = require("./DataManager.js");
    	var server = require("./Server.js");
    	


    	server.setupServer();
        server.setManager(dataManager);

    	dataManager.setupData(function(dataLoaded){
    		loadingComplete = dataLoaded;
            server.dataComplete(loadingComplete);
    	}); 
    }
};

App.init();















