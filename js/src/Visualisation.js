var App = App || {};

App.Visualisation = function(){

  var options, data;
  var selector = "day";

  var chart = new google.visualization.LineChart(document.getElementById('visualisation-canvas'));


  var setup = function(){
        google.setOnLoadCallback(drawChart);

        options = {
          title: 'Traffic',
          width: 1200,
          chartArea:{left:50,top:10},
          curveType: 'function',
          animation: {"startup": true,
          duration: 400},
          legend: { position: 'bottom' }
          
        };
  };

  var drawChart = function() {
      data = new google.visualization.DataTable();
      console.log("ABC");
      switch(selector) {
      case "day":
        
        data.addColumn('string', 'Stunden');
        data.addColumn('number', 'Anzahl der Logins');
      break
      case "week":
        data.addColumn('string', 'Wochentage');
        data.addColumn('number', 'Anzahl der Logins');
      break;
      }

    
    


      };
	
	var showTraffic = function(selector, rawData){

      this.selector = selector;
      drawChart();
      switch(selector) {
      case "day":
        for (var i = 0; i < rawData.length; i++) {
          console.log(rawData[i].logins);
          data.addRow([rawData[i].hour+ ":00 Uhr", rawData[i].logins]);
        };
      break
      case "week":
        for (var i = 0; i < rawData.length; i++) {
          data.addRow([rawData[i].wDay, rawData[i].logins]);
          console.log(rawData[i].wDay);
        };
      break;
      }

      chart.draw(data, options);
	}


	return {
        showTraffic: showTraffic,
        setup: setup
    };
};