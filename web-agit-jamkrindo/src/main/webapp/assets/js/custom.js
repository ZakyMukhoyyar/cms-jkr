/**
 * Created by usmanbinyahya on 9/13/15.
 */

var util = {
    generateJSON: function generateJSON(trLines, data) {
        var lines = [];
      
        for(var i=0 ; i < trLines.length; i++) {
            var trThis = $(trLines[i]);

            var list = trThis.find(".linesClass");

            var dataLines = {};
            for (var j = 0; j < list.length; j++) {
                var element = $(list[j]);

                try {

                    for(var k=0; k < data.length; k++) {
                        if (element.attr("name-data") == data[k].name) {
                            if(data[k].type == "string") {
                                dataLines[element.attr("name-data")] = element.val();
                            } else if(data[k].type == "int") {
                                dataLines[element.attr("name-data")] = parseInt(element.val());
                            } else if(data[k].type == "float") {
                                dataLines[element.attr("name-data")] = parseFloat(element.val());
                            }
                        }
                    }
                } catch (err) {
                    console.log(err);
                    dataLines[element.attr("name-data")] = element.val();
                }
            }

            lines.push(dataLines);
        }

        return lines;
    },
	generatedJSON: function generatedJSON(trLine, data) {
        var line = [];
      
        for(var i=0 ; i < trLine.length; i++) {
            var trThis = $(trLine[i]);

            var list = trThis.find(".lineClass");

            var dataLine = {};
            for (var j = 0; j < list.length; j++) {
                var element = $(list[j]);

                try {

                    for(var k=0; k < data.length; k++) {
                        if (element.attr("name-data") == data[k].name) {
                            if(data[k].type == "string") {
                                dataLine[element.attr("name-data")] = element.val();
                            } else if(data[k].type == "int") {
                                dataLine[element.attr("name-data")] = parseInt(element.val());
                            } else if(data[k].type == "float") {
                                dataLine[element.attr("name-data")] = parseFloat(element.val());
                            }
                        }
                    }
                } catch (err) {
                    console.log(err);
                    dataLine[element.attr("name-data")] = element.val();
                }
            }

            line.push(dataLine);
        }

        return line;
    },
   
    getJSONFromLines: function getJSONFromLines(data) {
        var trLines = $(document).find('.trLines');

        return this.generateJSON(trLines, data);
    },
	getJSONFromLine: function getJSONFromLine(data) {
        var trLine = $(document).find('.trLine');

        return this.generatedJSON(trLine, data);
    },
	getJSONFromLinesById: function getJSONFromLines(dataTableId, data) {
        var trLines = $("#" + dataTableId).find('.trLines');

        return this.generateJSON(trLines, data);
    },
	getJSONFromLineById: function getJSONFromLine(dataTableId, data) {
        var trLine = $("#" + dataTableId).find('.trLine');

        return this.generatedJSON(trLine, data);
    },
	
    guid: function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
};