var App = App || {};

App.Visualisation = function(){

  var options, data;
  var selector = "overall";
  var chart;
  var dashboard, donutRangeSlider;


  //var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  var setup = function(){
        google.setOnLoadCallback(drawChart);

        options = {
          title: 'Traffic',
          width: 1200,
          chartArea:{left:60,top:10},
          curveType: 'function',
          animation: {"startup": true,
          duration: 400},
          explorer: {  
          maxZoomOut:1,
          maxZoomIn: 4,
          keepInBounds: true
          },
          legend: {position: 'none'}
          
        };
  };

  var drawChart = function() {
  dashboard = new google.visualization.Dashboard(
            document.getElementById('visualisation-canvas'));






      data = new google.visualization.DataTable();
      console.log("ABC");
      switch(selector) {
      case "overall":
        data.addColumn('string', 'Tag');
        data.addColumn('number', 'Traffic');

      break
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
	
	var show = function(selector, rawData){
      this.selector = selector;
      drawChart();

      switch(selector) {
      case "overall":
        for (var i = 0; i < rawData.length; i++) {
          console.log(rawData[i].date);
          data.addRow([rawData[i].date , rawData[i].activity]);
        };
      break
      case "day":
        for (var i = 0; i < rawData.length; i++) {
          data.addRow([rawData[i].hour+ ":00 Uhr", rawData[i].logins]);
        };
      break
      case "week":
        for (var i = 0; i < rawData.length; i++) {
          data.addRow([rawData[i].wDay, rawData[i].logins]);
        };
      break;
      }
  donutRangeSlider = new google.visualization.ControlWrapper({
          'controlType': 'NumberRangeFilter',
          'containerId': 'filter_div',
          'options': {
            'filterColumnLabel': 'Traffic'

          }
  });





  dashboard.bind(donutRangeSlider, chart);
  chart = new google.visualization.ChartWrapper();
  chart.setChartType('LineChart');
  chart.setDataTable(data);
  chart.setContainerId('chart_div');
  chart.setOptions(options);
    chart.draw();
	}


	return {
        show: show,
        setup: setup
    };
};