/**
* Theme: Ubold Admin Template
* Author: Coderthemes
* Component: Widget
* 
*/
$( document ).ready(function() {
    
    var DrawSparkline = function() {
        $('#sparkline1').sparkline([ 7, 4, 9, 12, 13, 11, 12,7, 10, 12, 7, 4, 9, 12], {
            type: 'bar',
            height: '165',
            barWidth: '10',
            barSpacing: '3',
            barColor: '#5d9cec'
        });
        
        $('#sparkline2').sparkline([ 7, 10, 12, 7, 4, 9, 12,7, 4, 9, 12, 13, 11, 12], {
            type: 'bar',
            height: '165',
            barWidth: '10',
            barSpacing: '3',
            barColor: '#fb6d9d'
        });

        $('#sparkline3').sparkline([3, 6, 7, 8, 6, 4, 7,7, 4, 9, 12, 13, 11, 12], {
            type: 'bar',
            height: '165',
            barWidth: '10',
            barSpacing: '3',
            barColor: '#34d3eb'
        });
        

        
        
    };

    
    DrawSparkline();
    
    var resizeChart;

    $(window).resize(function(e) {
        clearTimeout(resizeChart);
        resizeChart = setTimeout(function() {
            DrawSparkline();
        }, 300);
    });
});