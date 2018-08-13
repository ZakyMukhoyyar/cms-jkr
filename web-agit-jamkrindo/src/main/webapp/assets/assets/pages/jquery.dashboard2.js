
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
    Dashboard1.prototype.Bar  = function(element, data, xkey, ykeys, labels, lineColors) {
        Morris.Bar({
            element: element,
            data: data,
            xkey: xkey,
            ykeys: ykeys,
            stacked: false,
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

        
        d3.json("assets/data/DPKKOL.json",function(error,dataBar1) {    
            //console.log(JSON.stringify( dataBar1));
             Dashboard1.prototype.Bar ('morris-bar', dataBar1, 'Tanggal', 
                                         ['DPK1 Dari Hari Sebelum', 'DPK2 Dari Hari Sebelum', 'DPK3 Dari Hari Sebelum', 'DPK3 ke PL Dari Hari Sebelum', 'Kol 5 Dari Hari Sebelum', 'Kol 5 ke PL Dari Hari Sebelum', 'Pelunasan Dari Hari Sebelum', 'Penyelesaian Dari Hari Sebelum'],  
                                         ['DPK1', 'DPK2', 'DPK3', 'DPK3 ke PL', 'Kol 5', 'Kol 5 ke PL', 'Pelunasan', 'Penyelesaian'],   
                                       ['#5d9cec', '#ffc302','#7266ba','#81c868','#fb6d9d','#c88c68','#cd352d','#159f97']);
            
        }); 


    },
    //init
    $.Dashboard1 = new Dashboard1, $.Dashboard1.Constructor = Dashboard1
}(window.jQuery),

//initializing 
function($) {
    "use strict";
    $.Dashboard1.init();
}(window.jQuery);