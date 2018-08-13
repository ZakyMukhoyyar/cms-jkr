$(document).ready(function(){

	function gt(y, m, d) {
		return new Date(y, m-1, d).getTime();
	}

	function getRandomValues() {
		// data setup
		var values = new Array(20);

		for (var i = 0; i < values.length; i++){
			values[i] = [5 + randomVal(), 10 + randomVal(), 15 + randomVal(), 20 + randomVal(), 30 + randomVal(),
				35 + randomVal(), 40 + randomVal(), 45 + randomVal(), 50 + randomVal()]
		}

		return values;
	}

	//*******************************************
	/*	SECONDARY STAT ITEM SPARKLINE
	/********************************************/

	if( $('.secondary-stat-item .inlinesparkline').length > 0 ) {
		var values2 = getRandomValues();
		var sparklineStat = function() {

			var params = {
				width:'' + $('.secondary-stat-item').innerWidth() + '',
				height: '70px',

				spotRadius: '2',
				spotColor: false,
				minSpotColor: false,
				maxSpotColor: false,

				lineWidth: 1,
				lineColor: "rgba(255,255,255, 0.2)",
				fillColor: 'rgba(255,255,255, 0.1)',
				highlightLineColor: '#fff',
				highlightSpotColor: '#fff',
				disableInteraction: true
			}

			$('.secondary-stat-item #spark-stat1').sparkline(values2[0], params);
			$('.secondary-stat-item #spark-stat2').sparkline(values2[1], params);
			$('.secondary-stat-item #spark-stat3').sparkline(values2[2], params);

		}
		
		sparklineStat();
	}

	/* sparkline on window resize */
	var sparkResize;

	$(window).resize(function(e) {
		clearTimeout(sparkResize);

		if( $('.secondary-stat-item .inlinesparkline').length > 0 ) {
			sparkResize = setTimeout(sparklineStat, 200);
		}
	});


	//*******************************************
	/*	MINI BAR CHART
	/********************************************/

	if( $('.mini-bar-chart').length > 0 ) {
		var values = getRandomValues();
		var params = {
			type: 'bar',
			barWidth: 5,
			height: 25
		}

		params.barColor = '#CE7B11';
		$('#mini-bar-chart1').sparkline(values[0], params);
		params.barColor = '#1D92AF';
		$('#mini-bar-chart2').sparkline(values[1], params);
		params.barColor = '#3F7577';
		$('#mini-bar-chart3').sparkline(values[2], params);
	}

	function randomVal(){
		return Math.floor( Math.random() * 80 );
	}

	//*******************************************
	/*	EASY PIE CHART
	/********************************************/

	if( $('.easy-pie-chart').length > 0 ) {

		var cOptions = {
			animate: 3000,
			trackColor: "#ccc",
			scaleColor: "#ddd",
			lineCap: "square",
			lineWidth: 5,
			barColor: "#ef1e25",
			onStep: function(from, to, percent) {
				$(this.el).find('.percent').text(Math.round(percent));
			}
		}

		cOptions.barColor = "#3E9C1A"; // green
		$('.easy-pie-chart.green').easyPieChart(cOptions);
		cOptions.barColor = "#FFB800"; // yellow
		$('.easy-pie-chart.yellow').easyPieChart(cOptions);
		cOptions.barColor = "#E60404"; // red
		$('.easy-pie-chart.red').easyPieChart(cOptions);
	}
	
	$('#multiselect2').multiselect({
		maxHeight: 300
	});
	
	//*******************************************
	/*	FLOT CHART
	/********************************************/

	if( $('.sales-chart').length > 0 ) {
		$placeholder = $('.sales-chart');
		$placeholder.attr('data-ctype', '#week');
		chartWeek($placeholder);

		// tabbed chart
		$('#sales-stat-tab a').click(function(e) {
			e.preventDefault();
		
			$chartType = $(this).attr('href');

			// remove active state
			$('#sales-stat-tab li').removeClass('active');
			$(this).parents('li').addClass('active');
			
			if($chartType == '#week') {
				chartWeek($placeholder);
			}else if($chartType == '#month') {
				chartMonth($placeholder);
			}else if($chartType == '#year') {
				chartYear($placeholder);
			}

			$placeholder.attr('data-ctype', $chartType);
		});

		var previousPoint = null;
	}
	
	// init flot chart: current week
	function chartWeek(placeholder) {

		var visit = [
			[gt(2013, 10, 21), 188], [gt(2013, 10, 22), 205], [gt(2013, 10, 23), 250], [gt(2013, 10, 24), 230], [gt(2013, 10, 25), 245], [gt(2013, 10, 26), 260], [gt(2013, 10, 27), 290]
		];

		var val = [
			[gt(2013, 10, 21), 10], [gt(2013, 10, 22),20], [gt(2013, 10, 23),55], [gt(2013, 10, 24),50], [gt(2013, 10, 25),45], [gt(2013, 10, 26),60], [gt(2013, 10, 27),75]
		];

		var plot = $.plot(placeholder, 
			[
				{
					data: visit,
					label: "Visits",
					lines: {
						show: true,
						lineWidth: 2,
						fill: true,
					},
					points: {
						show: true, 
						lineWidth: 3,
						fill: true,
						fillColor: "#fafafa"
					}
				},
				{
					data: val,
					label: "Sales",
					lines: {
						show: true,
						fill: true
					},
					points: {
						show: true, 
						fill: true,
						fillColor: "#fafafa"
					},
				}
			], 

			{
			series: {
				lines: {
					lineWidth: 2,
					fillColor: { colors: [ { opacity: 0.1 }, { opacity: 0.1 } ] }
				},
				points: {
					lineWidth: 3,
				},

				shadowSize: 0
			},
			grid: {
				hoverable: true, 
				clickable: true,
				borderWidth: 0,
				tickColor: "#E4E4E4"
			},
			colors: ["#E7A13D", "#FF3300"],
			yaxis: {
				font: { color: "#555" },
				ticks: 8
			},
			xaxis: {
				mode: "time",
				timezone: "browser",
				minTickSize: [1, "day"],
				timeformat: "%a",
				font: { color: "#555" },
				tickColor: "#fafafa",
				autoscaleMargin: 0.02
			},
			legend: {
				labelBoxBorderColor: "transparent",
				backgroundColor: "transparent"
			},
			tooltip: true,
			tooltipOpts: {
				content: '%s: %y'
			}

		});
	}

	// init flot chart: current month
	function chartMonth(placeholder) {

		var visit = [
			[gt(2013, 10, 1), 100], [gt(2013, 10, 2), 140], [gt(2013, 10, 3), 160], [gt(2013, 10, 4),190], [gt(2013, 10, 5),170], [gt(2013, 10, 6), 200], [gt(2013, 10, 7), 220],
			[gt(2013, 10, 8), 250], [gt(2013, 10, 9),280], [gt(2013, 10, 10), 240], [gt(2013, 10, 11), 250], [gt(2013, 10, 12), 260], [gt(2013, 10, 13), 300], [gt(2013, 10, 14), 320],
			[gt(2013, 10, 15), 330], [gt(2013, 10, 16), 370], [gt(2013, 10, 17), 390], [gt(2013, 10, 18), 350], [gt(2013, 10, 19), 340], [gt(2013, 10, 20), 320], [gt(2013, 10, 21), 370],
			[gt(2013, 10, 22), 400], [gt(2013, 10, 23), 440], [gt(2013, 10, 24), 450], [gt(2013, 10, 25), 470], [gt(2013, 10, 26), 450], [gt(2013, 10, 27), 500], [gt(2013, 10, 28), 540],
			[gt(2013, 10, 29), 600], [gt(2013, 10, 30), 580], [gt(2013, 10, 31), 620]
		];

		var val = [
			[gt(2013, 10, 1), 20], [gt(2013, 10, 2), 28], [gt(2013, 10, 3), 32], [gt(2013, 10, 4), 40], [gt(2013, 10, 5), 35], [gt(2013, 10, 6), 40], [gt(2013, 10, 7), 45],
			[gt(2013, 10, 8), 25], [gt(2013, 10, 9), 60], [gt(2013, 10, 10), 48], [gt(2013, 10, 11), 53], [gt(2013, 10, 12), 58], [gt(2013, 10, 13), 60], [gt(2013, 10, 14), 65],
			[gt(2013, 10, 15), 66], [gt(2013, 10, 16), 60], [gt(2013, 10, 17), 79], [gt(2013, 10, 18), 75], [gt(2013, 10, 19), 34], [gt(2013, 10, 20), 32], [gt(2013, 10, 21), 75],
			[gt(2013, 10, 22), 88], [gt(2013, 10, 23), 99], [gt(2013, 10, 24), 86], [gt(2013, 10, 25), 83], [gt(2013, 10, 26), 45], [gt(2013, 10, 27), 50], [gt(2013, 10, 28), 100],
			[gt(2013, 10, 29), 125], [gt(2013, 10, 30), 110], [gt(2013, 10, 31), 130]
		];

		var plot = $.plot(placeholder, 
			[
				{
					data: visit,
					label: "Visits",
					bars: {
						show: true,
						fill: false,
						barWidth: 0.1,
						align: "center",
						lineWidth: 18
					}
				},
				{
					data: val,
					label: "Sales"
				}
			], 

			{
				series: {
					lines: {
						show: true,
						lineWidth: 2, 
						fill: false
					},
					points: {
						show: true, 
						lineWidth: 3,
						fill: true,
						fillColor: "#fafafa"
					},
					shadowSize: 0
				},
				grid: {
					hoverable: true, 
					clickable: true,
					borderWidth: 0,
					tickColor: "#E4E4E4",
					
				},
				colors: ["rgba(217,217,217, 0.3)", "#d7ea2b"],
				yaxis: {
					font: { color: "#555" },
					ticks: 8,
				},
				xaxis: {
					mode: "time",
					timezone: "browser",
					minTickSize: [1, "day"],
					font: { color: "#555" },
					tickColor: "#fafafa",
					autoscaleMargin: 0.02
				},
				legend: {
					labelBoxBorderColor: "transparent",
					backgroundColor: "transparent"
				},
				tooltip: true,
				tooltipOpts: {
					content: '%s: %y'
				}
			}
		); 

	}

	// init flot chart: current year
	function chartYear(placeholder) {

		var visit = [
			[gt(2013, 1, 1), 200], [gt(2013, 2, 1), 300], [gt(2013, 3, 1), 360], [gt(2013, 4, 1), 340], [gt(2013, 5, 1), 440], [gt(2013, 6, 1), 600], [gt(2013, 7, 1), 1050],
			[gt(2013, 8, 1), 1700], [gt(2013, 9, 1), 1100], [gt(2013, 10, 1), 1200], [gt(2013, 11, 1), 1300], [gt(2013, 12, 1), 1500]
		];

		var val = [
			[gt(2013, 1, 1), 100], [gt(2013, 2, 1), 155], [gt(2013, 3, 1), 180], [gt(2013, 4, 1), 172], [gt(2013, 5, 1), 222], [gt(2013, 6, 1), 300], [gt(2013, 7, 1), 550],
			[gt(2013, 8, 1), 452], [gt(2013, 9, 1), 552], [gt(2013, 10, 1), 600], [gt(2013, 11, 1), 680], [gt(2013, 12, 1), 750]
		];

		var plot = $.plot(placeholder, 
			[
				{
					data: visit,
					label: "Visits"
				},
				{
					data: val,
					label: "Sales"

				}
			], 

			{
				series: {
					lines: {
						show: true,
						lineWidth: 2, 
						fill: false
					},
					points: {
						show: true, 
						lineWidth: 3,
						fill: true,
						fillColor: "#fafafa"
					},
					shadowSize: 0
				},
				grid: {
					hoverable: true, 
					clickable: true,
					borderWidth: 0,
					tickColor: "#E4E4E4",
					
				},
				colors: ["#d9d9d9", "#5399D6"],
				yaxis: {
					font: { color: "#555" },
					ticks: 8,
				},
				xaxis: {
					mode: "time",
					timezone: "browser",
					minTickSize: [1, "month"],
					font: { color: "#555" },
					tickColor: "#fafafa",
					autoscaleMargin: 0.02
				},
				legend: {
					labelBoxBorderColor: "transparent",
					backgroundColor: "transparent"
				},
				tooltip: true,
				tooltipOpts: {
					content: '%s: %y'
				}
			}
		);
	}

}); // end ready function