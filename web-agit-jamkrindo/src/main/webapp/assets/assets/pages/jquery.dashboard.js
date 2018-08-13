
/**
* Theme: Ubold Admin Template
* Author: Coderthemes
* Morris Chart
*/

!function($) {
    "use strict";

    var Dashboard1 = function() {
    	this.$realData = []
    };
    
    //creates Stacked chart
    Dashboard1.prototype.createStackedChart  = function(element, data, xkey, ykeys, labels, lineColors) {
        Morris.Bar({
            element: element,
            data: data,
            xkey: xkey,
            ykeys: ykeys,
            stacked: true,
            labels: labels,
            hideHover: 'auto',
            resize: true, //defaulted to true
            gridLineColor: '#eeeeee',
            barColors: lineColors
        });
    },

    //creates area chart with dotted
    Dashboard1.prototype.createAreaChartDotted = function(element, pointSize, lineWidth, data, xkey, ykeys, labels, Pfillcolor, Pstockcolor, lineColors) {
        Morris.Area({
            element: element,
            pointSize: 0,
            lineWidth: 0,
            data: data,
            xkey: xkey,
            ykeys: ykeys,
            labels: labels,
            hideHover: 'auto',
            pointFillColors: Pfillcolor,
            pointStrokeColors: Pstockcolor,
            resize: true,
            gridLineColor: '#eef0f2',
            lineColors: lineColors
        });

   },
  
    
    Dashboard1.prototype.init = function() {

           //creating Stacked chart
   /*        var $stckedData  = [
            { y: '2005', a: 45, b: 180, c: 100, d: 180 },
            { y: '2006', a: 75,  b: 65, c: 80, d: 180 },
            { y: '2007', a: 100, b: 90, c: 56, d: 180 },
            { y: '2008', a: 75,  b: 65, c: 89, d: 180 },
            { y: '2009', a: 100, b: 90, c: 120, d: 180 },
            { y: '2010', a: 75,  b: 65, c: 110, d: 180 },
            { y: '2011', a: 50,  b: 40, c: 85, d: 180 },
            { y: '2012', a: 75,  b: 65, c: 52, d: 180 },
            { y: '2013', a: 50,  b: 40, c: 77, d: 180 },
            { y: '2014', a: 75,  b: 65, c: 90, d: 180 },
            { y: '2015', a: 100, b: 90, c: 130, d: 180 }
        ];*/
        d3.json("assets/data/NPL.json",function(error,dataStack1) {
                Dashboard1.prototype.createStackedChart('morris-bar-stacked', dataStack1, 'Tanggal', ['Konsumer (Dikelola CCRD & AMD) Nominal', 'Komersial SMLD Nominal', 'Komersial (Dikelola CMLD & AMD) Nominal', 'Syariah Nominal'], ['CCRD &amp; AMD', 'SMLD', 'CMLD &amp; AMD', 'Syariah'], ['#5d9cec', '#ffc302','#7266ba','#81c868']);
        }); 

        //creating area chart
  /*      var $areaDotData = [
                { y: '2009', a: 10, b: 20, c:30 },
                { y: '2010', a: 75,  b: 65, c:30 },
                { y: '2011', a: 50,  b: 40, c:30 },
                { y: '2012', a: 75,  b: 65, c:30 },
                { y: '2013', a: 50,  b: 40, c:30 },
                { y: '2014', a: 75,  b: 65, c:30 },
                { y: '2015', a: 90, b: 60, c:30 }
            ];
        this.createAreaChartDotted('morris-area-with-dotted', 0, 0, $areaDotData, 'y', ['a', 'b', 'c'], ['Desktops ', 'Tablets ', 'Mobiles '],['#ffffff'],['#999999'], ['#5fbeaa', '#5d9cec','#ebeff2']);
*/
    },
    //init
    $.Dashboard1 = new Dashboard1, $.Dashboard1.Constructor = Dashboard1
}(window.jQuery),

//initializing 
function($) {
    "use strict";
    $.Dashboard1.init();
}(window.jQuery);