var App = App || {};


App.Main = (function () {
  

    function init() {
        dataManager = new App.DataManager;
        visualisation = new App.Visualisation;

        visualisation.setup();

        var dataDay, dataWeek, dataOverall;





        var loadTrafficData = function(selector, callback){
        	dataManager.loadTraffic(selector, function(){
            switch(selector) {
            case "overall":
                dataOverall = dataManager.getTrafficData("overall");
                callback();
            break
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

        $( "#traffic-button" ).addClass( "active" );
        $( "#data-title" ).text('Gesamtzeitraum');
        loadTrafficData("overall", function(){
        visualisation.showTraffic("overall", dataOverall);
        });


        $( "#traffic-button" ).click(function() {
 		 	$( "#traffic-button" ).addClass( "active" );
            $( "#data-title" ).text('Gesamtzeitraum');
            loadTrafficData("overall", function(){
            visualisation.showTraffic("overall", dataOverall);
            });
		});

        $( "#gesamt" ).click(function() {
            $( "#data-title" ).text('Gesamtzeitraum');
            loadTrafficData("overall", function(){
            visualisation.showTraffic("overall", dataOverall);
            });
        });


        $( "#tagesdurchschnitt" ).click(function() {
        $( "#data-title" ).text('Tagesdurchschnitt');
            loadTrafficData("day", function(){
            visualisation.showTraffic("day", dataDay);
            });
        });


        $( "#wochendurchschnitt" ).click(function() {
            $( "#data-title" ).text('Wochendurchschnitt');
            loadTrafficData("week", function(){
            visualisation.showTraffic("week", dataWeek);
            });
        });



    };
    
    return {
        init: init
    };
}());