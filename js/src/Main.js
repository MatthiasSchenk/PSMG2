var App = App || {};


App.Main = (function () {
  

    function init() {
        dataManager = new App.DataManager;
        visualisation = new App.Visualisation;

        visualisation.setup();

        var dataDay, dataWeek, dataOverall;







        var loadData = function(selector, callback){

        	dataManager.loadData(selector, function(){

            switch(selector) {
            case "overall":
                dataOverall = dataManager.getData("overall");
                callback();
            break
            case "day":
                dataDay = dataManager.getData("day");
                callback();
            break
            case "week":
                dataWeek = dataManager.getData("week");
                callback();
            break;
            }
        	});	
        };

        var onStart = function(){
            $( "#traffic-button" ).addClass( "active" );
            $( "#data-title" ).text('Gesamtzeitraum 21.1 - 21.3');
            loadData("overall", function(){
            visualisation.show("overall", dataOverall);
            });
        };




        $( "#traffic-button" ).click(function() {
 		 	$( "#traffic-button" ).addClass( "active" );
            $( "#data-title" ).text('Gesamtzeitraum 21.1 - 21.3');
            loadData("overall", function(){
            visualisation.show("overall", dataOverall);
            });
		});

        $( "#gesamt" ).click(function() {
            $( "#data-title" ).text('Gesamtzeitraum');
            loadData("overall", function(){
            visualisation.show("overall", dataOverall);
            });
        });


        $( "#tagesdurchschnitt" ).click(function() {
        $( "#data-title" ).text('Tagesdurchschnitt');
            loadData("day", function(){
            visualisation.show("day", dataDay);
            });
        });


        $( "#wochendurchschnitt" ).click(function() {
            $( "#data-title" ).text('Wochendurchschnitt');
            loadData("week", function(){
            visualisation.show("week", dataWeek);
            });
        });

        onStart();



    };
    
    return {
        init: init
    };
}());