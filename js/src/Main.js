var App = App || {};


App.Main = (function () {
  

    function init() {
        dataManager = new App.DataManager;
        visualisation = new App.Visualisation;

        visualisation.setup();

        var dataDay, dataWeek;



        var loadTrafficData = function(selector, callback){
        	dataManager.loadTraffic(selector, function(){
            switch(selector) {
            case "day":
                dataDay = dataManager.getTrafficData("day");
                callback();
            break
            case "week":
                dataWeek = dataManager.getTrafficData("week");
                callback();
            break;
            }
        	});
        	
        };


        $( "#traffic-button" ).click(function() {
 		 	$( "#traffic-button" ).addClass( "active" );
            loadTrafficData("day", function(){
            visualisation.showTraffic("day", dataDay);
            });
		});

        $( "#wochenverlauf" ).click(function() {
            $( "#data-title" ).text('Wochenverlauf');
            loadTrafficData("week", function(){
            visualisation.showTraffic("week", dataWeek);
            });
        });



    };
    
    return {
        init: init
    };
}());