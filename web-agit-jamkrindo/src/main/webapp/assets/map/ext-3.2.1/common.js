/*
 * common.js
 * 
 */
var defaultContWidth = 670;
//var baseURL = '_dummy.jsp?request=';
var baseURL = '';
var pagingSize = 20; 
var winTitleNotify = "Notification";
var enableAutoGetNotes = true;
var intervalGetNotes = 10000; // in milisecond
var globalErrorResponse = "Error in response";
var globalProcessingMsg = "Processing your request, please wait ...";
var lMask = undefined;
var hourArray = ['all','00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
var minArray = ['all','00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59' ];
var trafficTypeArr = [['all', 'All'],['1', 'Voice'],['2', 'SMS'],['3', 'GPRS'],['4', 'MMS']];

// GLOBAL AJAX CONTROLLER
var globalParse = function(resp) {
	if (resp == '') {
		Ext.Msg.alert(winTitleNotify, globalErrorResponse);
		return false;
	}
	
	try {
		var t = Ext.decode(resp);
	} catch(e) {
		Ext.Msg.alert(winTitleNotify, globalErrorResponse);
		return false;
	}
	return t;
}

Ext.Ajax.on('requestexception', function(a, b, c) {
	//console.log(lMask);
	if (Ext.isDefined(lMask)) lMask.hide();
	
	if (b.status == '401') {
		Ext.Msg.alert('Request Error', 'Unauthorized Access, Please relogin', function() {
			location.href='index.jsp';
		});
	} else if (b.status == '403') {
		Ext.Msg.alert('Request Error', 'Restricted Access, Please relogin', function() {
			location.href='index.jsp';
		});
	} else {
		Ext.Msg.alert('Error', b.statusText);
	}
}, this);

// EXT PATCHES
// add vtype of range date
Ext.apply(Ext.form.VTypes, {
    daterange : function(val, field) {
        var date = field.parseDate(val);

        if(!date){
            return;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = Ext.getCmp(field.startDateField);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        } 
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = Ext.getCmp(field.endDateField);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        /*
         * Always return true since we're only using this vtype to set the
         * min/max allowed values (these are tested for after the vtype test)
         */
        return true;
    }

});

// layout fix on displayField
Ext.override(Ext.form.DisplayField, {
	labelStyle: 'padding: 3px'
});

// readOnly handler
Ext.override(Ext.form.Field, {
    setReadOnly: function(readOnly) {
        if (readOnly == this.readOnly) {
            return;
        }
        this.readOnly = readOnly;

        if (readOnly) {
            this.el.dom.setAttribute('readOnly', true);
        } else {
            this.el.dom.removeAttribute('readOnly');
        }
    }
});

// messagebox size
Ext.Msg.minWidth = 300;
// form field hide patch
Ext.override(Ext.layout.FormLayout, {
	renderItem : function(c, position, target){
		if(c && !c.rendered && (c.isFormField || c.fieldLabel) && c.inputType != 'hidden'){
			var args = this.getTemplateArgs(c);
			if(typeof position == 'number'){
				position = target.dom.childNodes[position] || null;
			}
			if(position){
				c.formItem = this.fieldTpl.insertBefore(position, args, true);
			}else{
				c.formItem = this.fieldTpl.append(target, args, true);
			}
			c.actionMode = 'formItem';
			c.render('x-form-el-'+c.id);
			c.container = c.formItem;
			c.actionMode = 'container';
		}else {
			Ext.layout.FormLayout.superclass.renderItem.apply(this, arguments);
		}
	}
});
Ext.override(Ext.form.TriggerField, {
	actionMode: 'wrap',
	onShow: Ext.form.TriggerField.superclass.onShow,
	onHide: Ext.form.TriggerField.superclass.onHide
});
Ext.override(Ext.form.Checkbox, {
	actionMode: 'wrap',
	getActionEl: Ext.form.Checkbox.superclass.getActionEl
});
Ext.override(Ext.form.HtmlEditor, {
	actionMode: 'wrap'
});

// Grid Autoheight patch
Ext.override(Ext.grid.GridView, {
    layout : function(){
        if(!this.mainBody){
            return;
        }
        var g = this.grid;
        var c = g.getGridEl(), cm = this.cm,
                expandCol = g.autoExpandColumn,
                gv = this;
        var csize = c.getSize(true);
        var vw = csize.width;
        if(vw < 20 || csize.height < 20){
            return;
        }
        if(g.autoHeight){
	        csize.height = this.mainHd.getHeight() + this.mainBody.getHeight();
	        if (!this.forceFit) {
	        	csize.height += this.scrollOffset;
	        }
        }
        this.el.setSize(csize.width, csize.height);
        var hdHeight = this.mainHd.getHeight();
        var vh = csize.height - (hdHeight);
        this.scroller.setSize(vw, vh);
        if(this.innerHd){
            this.innerHd.style.width = (vw)+'px';
        }
        if(this.forceFit){
            if(this.lastViewWidth != vw){
                this.fitColumns(false, false);
                this.lastViewWidth = vw;
            }
        }else {
            this.autoExpand();
        }
        this.onLayout(vw, vh);
    }
});

// GLOBAL FUNCTION
function nl2br(text){
	text = escape(text);
	re_nlchar = '';
	if(text.indexOf('%0D%0A') > -1){
		re_nlchar = /%0D%0A/g ;
	}else if(text.indexOf('%0A') > -1){
		re_nlchar = /%0A/g ;
	}else if(text.indexOf('%0D') > -1){
		re_nlchar = /%0D/g ;
	}
	if (re_nlchar != '') {
		return unescape( text.replace(re_nlchar,'<br />') );
	} else {
		return unescape(text);
	}
}

/*
//moved to footer.jsp by njentit, avoid intermittent "Operation Aborted" on Microsoft buggy product
Ext.onReady(function(){
	document.getElementById('pageBreadCrumb').innerHTML = pBC;
});*/
 
var runningUpdateCount = false;
/*
var getNotesCount = function() {
 
  if (runningUpdateCount == false) {
	runningUpdateCount = true;
	Ext.Ajax.request({
	   url: baseURL+'getNotesCount',
	   success: function(response, opts) {
		   	var obj = Ext.decode(response.responseText);
		   	Ext.getDom('countNotes').innerHTML = obj.data.notes_count;
			runningUpdateCount = false;
		},
		failure: function(x) {
			runningUpdateCount = false;
		}
	});
  }
}


if (enableAutoGetNotes) { // run get note every n seconds
	Ext.TaskMgr.start({
	    run: getNotesCount,
	    interval: intervalGetNotes
	});
}
*/
var renderText = function(value, p, r){
	if (value == '') return '';
	return nl2br(value);
}

var renderDate = function(value, p, r){
 
		if (value == '') return '';
        return value.dateFormat('d/m/Y');
}

var renderDateTime = function(value, p, r){
	if (value == '') return '';
    return value.dateFormat('d/m/Y H:i:s');
}

var buildFilter = function(key, value, cbStore) {
	
	var tmp = {};
	for(var i = 0; i < cbStore.getCount(); i++) {
		var rec = cbStore.getAt(i);
		if (key == rec.data.field1)
			tmp[rec.data.field1] = value;
		else 
			tmp[rec.data.field1] = '';
	}
	tmp = Ext.encode(tmp);
	return tmp;
}

var buildDeleteID = function(idArr) {
	var tmp = idArr.join("','");
	tmp = "'"+tmp+"'";
	return tmp;
}

var getMainStore = function(sId, url, id_field, field_desc) {
	
	var store = new Ext.data.JsonStore({
		storeId: sId,
		autoLoad: false,
		timeout:180000000,
		url: url,
		root: 'data',
		totalProperty: 'totalCount',
		idProperty: id_field,
		fields: field_desc,
		remoteSort: true,
		baseParams: {
			filter: ''
		}
	});
	return store;
}

var getMainGrid = function(grid_id, grid_title, grid_store, grid_columns, grid_button) {
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",        
        items:grid_button
    });
		bbar.refresh.hideParent = true;
	   bbar.refresh.hide();
	
    return new Ext.grid.GridPanel({
    	id: grid_id,
        width:defaultContWidth,
        stripeRows: true,
        autoHeight:true,
      //  title:grid_title,
        store: grid_store,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        viewConfig: {
        	forceFit: true
		},
        bbar: bbar
    });
}

var getMainGridAgent = function(grid_id, grid_title, grid_store, grid_columns, grid_button, grid_button_cfg) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";

	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:grid_button
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();

	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});

	
	
	if (grid_button_cfg.actionPos == "right") 
	    grid_columns.push(update);
	 
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") 
	    grid_columns.push(update);
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();
	
	update.on('action', grid_button_cfg.updateHandler);
	
	
	
    return new Ext.grid.GridPanel({
    	id: grid_id,
    	 autoWidth:true,
       // autoHeight:true,
    	 height:500,
   //     title:grid_title,
        store: grid_store,
           stripeRows: true,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [update],
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
}

//getMainGridTemplateNoEdit

var getMainGridTemplateNoEdit = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,Lwidth,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	if (Lheight.length == 0){
	    Lheight=300;
	}
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	/*var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	*/
	
	
	//if (grid_button_cfg.actionPos == "right") 
	 //   grid_columns.push(update);
	 
	grid_columns.reverse();
	//if (grid_button_cfg.actionPos == "left") 
	 //   grid_columns.push(update);
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();

	//update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	if (grid_filter.length > 0) {
		var filter_combobox = new Ext.form.ComboBox({
	   		store: grid_filter, id: grid_id+'_filter_key',
	   		editable: false, mode: 'local', forceSelection: true,
	   		triggerAction: 'all', fieldLabel: 'Filter', width: 200
	   		});
		
		filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
		
		tbar.push(filter_combobox);
		tbar.push(' ');
		tbar.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value',
       		width:200
       	}));
       	
		tbar.push(' &nbsp; ');
       	 tbar.push(' ');
       	 
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		tbar.push(' &nbsp; ');
		tbar.push('-');
	}		
	
	tbar.push({
  	     text: 'Add',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	 });
   	 
   	 
	tbar.push('-');
	tbar.push({
  	     text: 'Delete',
   	     iconCls: 'icon-chart-delete',
   	     handler: grid_button_cfg.deleteHandler
   	 });
   	 
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	id: grid_id,
        autoWidth:true,
        //autoHeight:true,
        height:Lheight,
    	enableColumnHide: false,
      //  title:grid_title+' List',
           stripeRows: true,
        store: grid_store,
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
     //   plugins: [update],
        tbar: tbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
}

//getMainGridTemplatePeriod
var getMainGridTemplatePeriod = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,Lwidth,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	if (Lheight.length == 0){
	    Lheight=300;
	}
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	
	
	
	if (grid_button_cfg.actionPos == "right") 
	    grid_columns.push(update);
	 
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") 
	    grid_columns.push(update);
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();

	update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	if (grid_filter.length > 0) {
		var filter_combobox = new Ext.form.ComboBox({
	   		    store: grid_filter, 
	   		    id: grid_id+'_filter_key',
	   		    editable: false, 
	   		    mode: 'local', 
	   		    forceSelection: true,
	   		    triggerAction: 'all', 
	   		    fieldLabel: 'Filter', 
	   		    width: 200,
	   		    listeners:{
	   		        select:function(combo, record, index) {
	   		       
	   		        if (record.data.field1 =='default_flag'){
	   		      
	   		        Ext.getCmp(grid_id+'_filter_value2').show();
	   		         Ext.getCmp(grid_id+'_filter_value').hide();
	   		       
	   		      
	   		        }else{
	   		         Ext.getCmp(grid_id+'_filter_value2').hide();	   		        
	   		         Ext.getCmp(grid_id+'_filter_value').show();
	   		        
	   		        }
                   } 
	   		    }
	   		});
		
		filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
		
		tbar.push(filter_combobox);
		tbar.push(' ');
		
		tbar.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value',
       		width:200,
       		hidden:false
       	}));

       	tbar.push(new Ext.form.ComboBox({
	                 xtype:'combobox',
		             store: [['1', 'YES'],['0', 'NO']],
		             displayField:'text',
		             valueField:'value',
		             editable: false,
		             mode: 'local',
		             forceSelection: true,
		             triggerAction: 'all',
			         fieldLabel: 'Default Flag',				                   
			         hiddenName: 'default_flag',
		             id: grid_id+'_filter_value2',
		             width:200
		              ,hidden:true    
		        }));
       	
       	
		tbar.push(' &nbsp; ');
       	 tbar.push(' ');
       	 
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		tbar.push(' &nbsp; ');
		tbar.push('-');
	}		
	
	tbar.push({
  	     text: 'Add',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	 });
   	 
   	 
	tbar.push('-');
	tbar.push({
  	     text: 'Delete',
   	     iconCls: 'icon-chart-delete',
   	     handler: grid_button_cfg.deleteHandler
   	 });
   	 
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	id: grid_id,
        autoWidth:true,
        //autoHeight:true,
        height:Lheight,
           stripeRows: true,
    	enableColumnHide: false,
    //    title:grid_title+' List',
        store: grid_store,
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [update],
        tbar: tbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
}


//getMainGridTemplateDate

var getMainGridTemplateDate = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,Lwidth,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	if (Lheight.length == 0){
	    Lheight=300;
	}
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	
	
	
	if (grid_button_cfg.actionPos == "right") 
	    grid_columns.push(update);
	 
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") 
	    grid_columns.push(update);
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();

	update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	if (grid_filter.length > 0) {
		var filter_combobox = new Ext.form.ComboBox({
	   		    store: grid_filter, 
	   		    id: grid_id+'_filter_key',
	   		    editable: false, 
	   		    mode: 'local', 
	   		    forceSelection: true,
	   		    triggerAction: 'all', 
	   		    fieldLabel: 'Filter', 
	   		    width: 200,
	   		    listeners:{
	   		        select:function(combo, record, index) {
	   		        if (record.data.field1 =='tanggal'){
	   		      
	   		        Ext.getCmp(grid_id+'_filter_value2').show();
	   		         Ext.getCmp(grid_id+'_filter_value').hide();
	   		       
	   		      
	   		        }else{
	   		         Ext.getCmp(grid_id+'_filter_value2').hide();
	   		        
	   		         Ext.getCmp(grid_id+'_filter_value').show();
	   		        
	   		        }
	   		        
                
                   } 
	   		    }
	   		});
		
		filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
		
		tbar.push(filter_combobox);
		tbar.push(' ');
		
		tbar.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value',
       		width:200,
       		hidden:true
       	}));

       	tbar.push(new Ext.form.DateField  ({
       		id: grid_id+'_filter_value2',
       		width:200,
       		hidden:false,
       		format: 'm/d/Y'
       	}));
       	
       	
		tbar.push(' &nbsp; ');
       	 tbar.push(' ');
       	 
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		tbar.push(' &nbsp; ');
		tbar.push('-');
	}		
	
	tbar.push({
  	     text: 'Add',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	 });
   	 
   	 
	tbar.push('-');
	tbar.push({
  	     text: 'Delete',
   	     iconCls: 'icon-chart-delete',
   	     handler: grid_button_cfg.deleteHandler
   	 });
   	 
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	id: grid_id,
        autoWidth:true,
        //autoHeight:true,
        height:Lheight,
           stripeRows: true,
    	enableColumnHide: false,
     //   title:grid_title+' List',
        store: grid_store,
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [update],
        tbar: tbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
}





var getMainGridReport = function(grid_id, grid_title, grid_store, grid_columns,  grid_button_cfg, w,h) {
	if (grid_button_cfg.autofitGrid == undefined) 
		grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) 
		grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	
	// var gridExport = [];
	// if (grid_button_cfg.showExport == true) {
	 var gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon-csv',
		     handler: grid_button_cfg.exportHandler
		 }];
	  
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display"
         ,items:gridExport
    });
	
	 bbar.refresh.hideParent = true;
	 bbar.refresh.hide();
		return new Ext.grid.GridPanel({
		    	id: grid_id,
		        autoWidth:true,
		        height:h,
		        stripeRows: true,
		    	enableColumnHide: false,
		    	title:grid_title+' List',		    	
		        store: grid_store,		    
		        trackMouseOver:false,
		        loadMask: true,
		        columns: grid_columns,
		        viewConfig: {
		        	forceFit: grid_button_cfg.autofitGrid
				},
				  bbar: bbar
		      
    });
}









//getMainGridCurrencyValue
var getMainGridCurrencyValue = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,Lwidth,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	if (Lheight.length == 0){
	    Lheight=300;
	}
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	
	
	
	if (grid_button_cfg.actionPos == "right") 
	    grid_columns.push(update);
	 
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") 
	    grid_columns.push(update);
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();

	update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	if (grid_filter.length > 0) {
		var filter_combobox = new Ext.form.ComboBox({
	   		    store: grid_filter, 
	   		    id: grid_id+'_filter_key',
	   		    editable: false, 
	   		    mode: 'local', 
	   		    forceSelection: true,
	   		    triggerAction: 'all', 
	   		    fieldLabel: 'Filter', 
	   		    width: 200,
	   		    listeners:{
	   		        select:function(combo, record, index) {
	   		      
	   		        if (record.data.field1 =='start_date'){
	   		      
	   		            Ext.getCmp(grid_id+'_filter_value2').show();
	   		            Ext.getCmp(grid_id+'_filter_value3').hide();
	   		            
	   		             Ext.getCmp(grid_id+'_filter_value').hide();
	   		       } else if (record.data.field1 =='convert_to_idr'){
	   		       //
	   		               Ext.getCmp(grid_id+'_filter_value2').hide();
	   		                Ext.getCmp(grid_id+'_filter_value3').show();
	   		                
	   		                 Ext.getCmp(grid_id+'_filter_value').hide();
	   		        }else if (record.data.field1 =='end_date'){
	   		       //
	   		               Ext.getCmp(grid_id+'_filter_value3').hide();
	   		                Ext.getCmp(grid_id+'_filter_value2').show();
	   		                 
	   		                 Ext.getCmp(grid_id+'_filter_value').hide();
	   		        }else{
	   		             Ext.getCmp(grid_id+'_filter_value2').hide();
	   		             Ext.getCmp(grid_id+'_filter_value3').hide();	  	   		                   
	   		             Ext.getCmp(grid_id+'_filter_value').show();
	   		        
	   		        }
	   		        
                
                   } 
	   		    }
	   		});
		
		filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
		
		tbar.push(filter_combobox);
		tbar.push(' ');
		
		tbar.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value',
       		width:200,
       		hidden:false
       	}));

       	tbar.push(new Ext.form.DateField  ({
       		id: grid_id+'_filter_value2',
       		width:200,
       		hidden:true,
       		format: 'Y/m/d'
       	}));
       	
       	 tbar.push(new Ext.form.NumberField  ({
       		id: grid_id+'_filter_value3',
       		width:200,
       		hidden:true,
       		blankText: '0.00',
                    decimalPrecision: 2,
                    decimalSeparator:'.',
                    cls: 'rtl',
                    allowNegative: false,
                    allowBlank: false
       		
       	}));
       	
       	 
				     
				     
                    
                    
		tbar.push(' &nbsp; ');
       	 tbar.push(' ');
       	 
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		tbar.push(' &nbsp; ');
		tbar.push('-');
	}		
	
	tbar.push({
  	     text: 'Add',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	 });
   	 
   	 
	tbar.push('-');
	tbar.push({
  	     text: 'Delete',
   	     iconCls: 'icon-chart-delete',
   	     handler: grid_button_cfg.deleteHandler
   	 });
   	 
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	id: grid_id,
        autoWidth:true,
        //autoHeight:true,
        height:Lheight,
           stripeRows: true,
    	enableColumnHide: false,
       // title:grid_title+' List',
        store: grid_store,
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [update],
        tbar: tbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
}



//getMainGridRateValue
var getMainGridRateValue = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,Lwidth,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	if (Lheight.length == 0){
	    Lheight=300;
	}
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	
	
	
	if (grid_button_cfg.actionPos == "right") 
	    grid_columns.push(update);
	 
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") 
	    grid_columns.push(update);
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();

	update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	if (grid_filter.length > 0) {
		var filter_combobox = new Ext.form.ComboBox({
	   		    store: grid_filter, 
	   		    id: grid_id+'_filter_key',
	   		    editable: false, 
	   		    mode: 'local', 
	   		    forceSelection: true,
	   		    triggerAction: 'all', 
	   		    fieldLabel: 'Filter', 
	   		    width: 200,
	   		    listeners:{
	   		        select:function(combo, record, index) {
	   		        if (record.data.field1 =='start_date' || record.data.field1 =='end_date' ){
	   		      
	   		            Ext.getCmp(grid_id+'_filter_value2').show();
	   		           Ext.getCmp(grid_id+'_filter_value').hide();
	   		           Ext.getCmp(grid_id+'_filter_value3').hide();
	   		         
	   		       }else if (record.data.field1 == 'active'){
	   		       
	   		          Ext.getCmp(grid_id+'_filter_value3').show();
	   		           Ext.getCmp(grid_id+'_filter_value2').hide();
	   		           Ext.getCmp(grid_id+'_filter_value').hide();
	   		      
	   		        }else{
	   		         Ext.getCmp(grid_id+'_filter_value2').hide();	   		        
	   		           Ext.getCmp(grid_id+'_filter_value3').hide();
	   		         Ext.getCmp(grid_id+'_filter_value').show();
	   		        }
	   		      } 
	   		    }
	   		});
		
		filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
		
		tbar.push(filter_combobox);
		tbar.push(' ');
		
		tbar.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value',
       		width:200,
       		hidden:false
       	}));

       	tbar.push(new Ext.form.DateField  ({
       		id: grid_id+'_filter_value2',
       		width:200,
       		hidden:true,
       		format: 'm/d/Y'
       	}));
       	
       	tbar.push( new Ext.form.ComboBox({
	                 xtype:'combobox',
		             store: [['1', 'TRUE'],['0', 'FALSE']],
		             displayField:'text',
		             valueField:'value',
		             editable: false,
		             mode: 'local',
		             forceSelection: true,
		             triggerAction: 'all',
			         fieldLabel: 'Active',				                   
			         hiddenName: 'active',		             
		              width:200,  
		              	id: grid_id+'_filter_value3'
		              ,hidden:true
		        }));
       	
       	
		tbar.push(' &nbsp; ');
       	 tbar.push(' ');
       	 
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		tbar.push(' &nbsp; ');
		tbar.push('-');
	}		
	
	tbar.push({
  	     text: 'Add',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	 });
   	 
   	 
	tbar.push('-');
	tbar.push({
  	     text: 'Delete',
   	     iconCls: 'icon-chart-delete',
   	     handler: grid_button_cfg.deleteHandler
   	 });
   	 
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	id: grid_id,
        autoWidth:true,
        //autoHeight:true,
        height:Lheight,
           stripeRows: true,
    	enableColumnHide: false,
     //   title:grid_title+' List',
        store: grid_store,
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [update],
        tbar: tbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
}




 
var getMainGridTemplate = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,Lwidth,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	 
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	
	 
	if (grid_button_cfg.actionPos == "right") 
	    grid_columns.push(update);
	 
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") 
	    grid_columns.push(update);
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();

	update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	if (grid_filter.length > 0) {
		 var filter_combobox = new Ext.form.ComboBox({
	   		store: grid_filter,
	   		id: grid_id+'_filter_key',
	   		editable: false, 
	   		mode: 'local', 
	   		forceSelection: true,
	   		triggerAction: 'all', 
	   		fieldLabel: 'Filter', 	   		
	   		width: 200
	   		});
	   		 
		 
		
		 filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
	 
		
		
 	if  (checkBrowser().browser == "Explorer"){
 		 tbar.push(filter_combobox);
			tbar.push(' &nbsp; ');		
			tbar.push(' &nbsp; ');	
			 tbar.push(' ');
			 
			  
	 	}else{
	 		 filter_combobox.on('afterrender', function(cb){
				var tRec = cb.getStore().getAt(0);
				if (tRec != undefined) {
					cb.setValue(tRec.data.field1);
				}
			});
			 
	 		 tbar.push(filter_combobox);
	 		
	 	}
	 tbar.push(new Ext.form.TextField ({
        		id: grid_id+'_filter_value',
       		width:200
       	}));
       	
		tbar.push(' &nbsp; ');
       	 tbar.push(' ');
       	 
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		tbar.push(' &nbsp; ');
		tbar.push('-');
		
	
	tbar.push({
  	     text: 'Add',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	 });
   	 
   	 
	tbar.push('-');
	tbar.push({
  	     text: 'Delete',
   	     iconCls: 'icon-chart-delete',
   	     handler: grid_button_cfg.deleteHandler
   	 });
	}	
	
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	id: grid_id,
        //autoWidth:true,
        //autoHeight:true,
    	  
    	 width:Lwidth,
         height:Lheight,
           stripeRows: true,
    	enableColumnHide: false,
      //  title:grid_title+' List',
        store: grid_store,
        tbar: tbar,  
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [update],
               
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		}
      ,bbar: bbar
    });
};



var getMainGridTemplateKomandoFieldReport = function(grid_id, grid_title, grid_store, grid_columns, grid_button_cfg) {
	var Lwidth = 1357;		 
	var Lheight = 400-10;
	var browserVersion = checkBrowser().browser;
	var version = checkBrowser().version;
	 	if  (browserVersion == "Firefox"){
	 		Lheight = window.innerHeight;
	 		Lwidth = window.innerWidth;
	 	}else if (browserVersion == "Explorer"){
	 	 	if (version >= 7){
					 
	 	 	}else{

	 	 	}
		
}
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	 
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
//	var update = new Ext.ux.grid.RowActions({
//		 header:' '
//		,widthSlope: 20
//		,keepSelection:true
//		,actions:[{
//			iconCls:'icon-chart-edit'
//			,tooltip:'Edit Record'
//		}]
//	});
//	
//	 
//	if (grid_button_cfg.actionPos == "right") 
//	    grid_columns.push(update);
//	 
//	grid_columns.reverse();
//	if (grid_button_cfg.actionPos == "left") 
//	    grid_columns.push(update);
//	 
//	
//	grid_columns.push(sm);
//	grid_columns.reverse();
//
//	update.on('action', grid_button_cfg.updateHandler);
	
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
    return new Ext.grid.GridPanel({
    	id: grid_id,
    	width: Lwidth,
        height: Lheight,
        stripeRows: true,
    	enableColumnHide: false,
        store: grid_store,
        trackMouseOver: false,
        loadMask: true,
        columns: grid_columns,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
		bbar: bbar
    });
};



var getMainGridTemplateKomandoCast = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg) {
	var Lwidth = 1357;		 
	var Lheight = 400-10;
	var browserVersion = checkBrowser().browser;
	var version = checkBrowser().version;
	 	if  (browserVersion == "Firefox"){
	 		Lheight = window.innerHeight;
	 		Lwidth = window.innerWidth;
	 	}else if (browserVersion == "Explorer"){
	 	 	if (version >= 7){
					 
	 	 	}else{

	 	 	}
		
	 	}
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	 
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
//	var sm = new Ext.grid.CheckboxSelectionModel({
//		checkOnly: true
//		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
//            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
//            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
//                })
//	});
//	
//	var update = new Ext.ux.grid.RowActions({
//		 header:' '
//		,widthSlope: 20
//		,keepSelection:true
//		,actions:[{
//			iconCls:'icon-chart-edit'
//			,tooltip:'Edit Record'
//		}]
//	});
//	
//	 
//	if (grid_button_cfg.actionPos == "right") 
//	    grid_columns.push(update);
//	 
//	grid_columns.reverse();
//	if (grid_button_cfg.actionPos == "left") 
//	    grid_columns.push(update);
//	 
//	
//	grid_columns.push(sm);
//	grid_columns.reverse();
//
//	update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
//	if (grid_filter.length > 0) {
//		 var filter_combobox = new Ext.form.ComboBox({
//	   		store: grid_filter,
//	   		id: grid_id+'_filter_key',
//	   		editable: false, 
//	   		mode: 'local', 
//	   		forceSelection: true,
//	   		triggerAction: 'all', 
//	   		fieldLabel: 'Filter', 	   		
//	   		width: 200
//	   		});
//	   		 
//		 
//		
//		 filter_combobox.on('afterrender', function(cb){
//			var tRec = cb.getStore().getAt(0);
//			if (tRec != undefined) {
//				cb.setValue(tRec.data.field1);
//			}
//		});
//	 
//		
//		
// 	if  (checkBrowser().browser == "Explorer"){
// 		 tbar.push(filter_combobox);
//			tbar.push(' &nbsp; ');		
//			tbar.push(' &nbsp; ');	
//			 tbar.push(' ');
//			 
//			  
//	 	}else{
//	 		 filter_combobox.on('afterrender', function(cb){
//				var tRec = cb.getStore().getAt(0);
//				if (tRec != undefined) {
//					cb.setValue(tRec.data.field1);
//				}
//			});
//			 
//	 		 tbar.push(filter_combobox);
//	 		
//	 	}
//	 tbar.push(new Ext.form.TextField ({
//        		id: grid_id+'_filter_value',
//       		width:200
//       	}));
//       	
//		tbar.push(' &nbsp; ');
//       	 tbar.push(' ');
//       	 
//		tbar.push({
//	  	     text: 'Search',
//	  	     iconCls: 'x-tbar-loading',
//	   	     handler: grid_button_cfg.readHandler
//	   	 });
//		tbar.push(' &nbsp; ');
//		tbar.push('-');
//		
//	
//	
//	}
	
//	tbar.push({
// 	     text: 'Reload',
// 	     iconCls: 'x-tbar-loading',
//  	     handler: grid_button_cfg.reloadHandler
//  	 });
//	tbar.push(' &nbsp; ');
//	tbar.push('-');
	 
	tbar.push({
 	     text: 'Add',
  	     iconCls: 'icon-chart-add',
  	     id: 'globalCreateButton',
  	     handler: grid_button_cfg.createHandler
  	 });
  	 
  	 
//	tbar.push('-');
//	tbar.push({
// 	     text: 'Delete',
//  	     iconCls: 'icon-chart-delete',
//  	     handler: grid_button_cfg.deleteHandler
//  	 });
	
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
//	bbar.refresh.hideParent = true;
//	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	id: grid_id,
        //autoWidth:true,
        //autoHeight:true,
    	  
    	 width:Lwidth,
         height:Lheight,
           stripeRows: true,
    	enableColumnHide: false,
      //  title:grid_title+' List',
        store: grid_store,
        tbar: tbar,  
//        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
               
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		}
      ,bbar: bbar
    });
};




var getMainGridTemplateKomando = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,Lwidth,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	 
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	
	 
	if (grid_button_cfg.actionPos == "right") 
	    grid_columns.push(update);
	 
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") 
	    grid_columns.push(update);
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();

	update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	if (grid_filter.length > 0) {
		 var filter_combobox = new Ext.form.ComboBox({
	   		store: grid_filter,
	   		id: grid_id+'_filter_key',
	   		editable: false, 
	   		mode: 'local', 
	   		forceSelection: true,
	   		triggerAction: 'all', 
	   		fieldLabel: 'Filter', 	   		
	   		width: 200
	   		});
	   		 
		 
		
		 filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
	 
		
		
 	if  (checkBrowser().browser == "Explorer"){
 		 tbar.push(filter_combobox);
			tbar.push(' &nbsp; ');		
			tbar.push(' &nbsp; ');	
			 tbar.push(' ');
			 
			  
	 	}else{
	 		 filter_combobox.on('afterrender', function(cb){
				var tRec = cb.getStore().getAt(0);
				if (tRec != undefined) {
					cb.setValue(tRec.data.field1);
				}
			});
			 
	 		 tbar.push(filter_combobox);
	 		
	 	}
	 tbar.push(new Ext.form.TextField ({
        		id: grid_id+'_filter_value',
       		width:200
       	}));
       	
		tbar.push(' &nbsp; ');
       	 tbar.push(' ');
       	 
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		tbar.push(' &nbsp; ');
		tbar.push('-');
		
	
	
	}	
	 
	tbar.push({
 	     text: 'Add',
  	     iconCls: 'icon-chart-add',
  	     id: 'globalCreateButton',
  	     handler: grid_button_cfg.createHandler
  	 });
  	 
  	 
	tbar.push('-');
	tbar.push({
 	     text: 'Delete',
  	     iconCls: 'icon-chart-delete',
  	     handler: grid_button_cfg.deleteHandler
  	 });
	
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	id: grid_id,
        //autoWidth:true,
        //autoHeight:true,
    	  
    	 width:Lwidth,
         height:Lheight,
           stripeRows: true,
    	enableColumnHide: false,
      //  title:grid_title+' List',
        store: grid_store,
        tbar: tbar,  
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [update],
               
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		}
      ,bbar: bbar
    });
}



var getMainGridTemplateTask = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,Lwidth,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	 
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	
	 
	 
	if (grid_button_cfg.actionPos == "right")  
	    grid_columns.push(update);	
	   
		grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left")  
	    grid_columns.push(update);
	 
	 
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();

	update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	if (grid_filter.length > 0) {
		
		
		 var filter_combox = new Ext.form.ComboBox({
	   		store: grid_filter,
	   		id: grid_id+'_filter_key',
	   		 editable: false, 
	   		 mode: 'local', 
 	   		forceSelection: true,
	   		triggerAction: 'all', 
	   		fieldLabel: 'Filter'	   		
	    		,autoWidth: true
	   		});
	   		 
		 
	   		 
		 
		
 	 filter_combox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
	 
	 
		 tbar.push(filter_combox);
		 
			tbar.push(' &nbsp; ');
			tbar.push(' &nbsp; ');
			tbar.push(' ');
		
 	 
 	
	 tbar.push(new Ext.form.TextField ({
        		id: grid_id+'_filter_value',
       		width:200
       	}));
       	
		  tbar.push(' &nbsp; ');
       	 tbar.push(' ');
       	 
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
	
	}
		tbar.push(' &nbsp; ');
		
		if (grid_button_cfg.createHandler != undefined){
				tbar.push('-');
				tbar.push({
			  	     text: 'Add',
			   	     iconCls: 'icon-chart-add',
			   	     id: 'globalCreateButton',
			   	     handler: grid_button_cfg.createHandler
			   	 });
		}
	
   	 
		if (grid_button_cfg.deleteHandler != undefined){
			tbar.push('-');
			tbar.push({
		  	     text: 'Delete',
		   	     iconCls: 'icon-chart-delete',
		   	     handler: grid_button_cfg.deleteHandler
		   	 });
		}
		 
	
	if ( grid_button_cfg.attachmentHandler != undefined){
			tbar.push('-');
			tbar.push({
			     text: 'Lampiran',
		 	     iconCls: 'icon-attachment',
		 	     id: 'attachment',
		 	     handler: grid_button_cfg.attachmentHandler
		 	 });
	}
	
	if ( grid_button_cfg.chatHandler != undefined){
		tbar.push('-');
		tbar.push({
		     text: 'Komunikasi',
	 	     iconCls: 'icon-chat',
	 	     id: 'chat',
	 	     handler: grid_button_cfg.chatHandler
	 	 });
	}
	
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display"
        ,items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	id: grid_id,
        //autoWidth:true,
        //autoHeight:true,
    	  
    	 width:Lwidth,
         height:Lheight,
           stripeRows: true,
    	enableColumnHide: false,
      //  title:grid_title+' List',
        store: grid_store,
        tbar: tbar,  
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [update],
               
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		}
      ,bbar: bbar
    });
}


//getMainGridTemplateDetail
var getMainGridTemplateDetail = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,Lwidth,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	if (Lheight.length == 0){
	    Lheight=300;
	}
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	var updateDetail = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	
	/*
	var addItem = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-add'
			,tooltip:'Add Query'
		}]
	});
	*/
	
	if (grid_button_cfg.actionPos == "right") 
	    grid_columns.push(updateDetail);
	 
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") 
	    grid_columns.push(updateDetail);
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();

	updateDetail.on('action', grid_button_cfg.updateDetailHandler);
	
	var tbarx = [];
	if (grid_filter.length > 0) {
		var filter_combobox = new Ext.form.ComboBox({
	   		store: grid_filter, id: grid_id+'_filter_key',
	   		editable: false, mode: 'local', forceSelection: true,
	   		triggerAction: 'all', fieldLabel: 'Filter', width: 200
	   		});
		
		filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
		
		tbarx.push(filter_combobox);
		tbarx.push(' ');
		tbarx.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value',
       		width:200
       	}));
       	
		tbarx.push(' &nbsp; ');
       	 tbarx.push(' ');
       	 
		tbarx.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readDetailHandler
	   	 });
		tbarx.push(' &nbsp; ');
		tbarx.push('-');
	}		
	
	tbarx.push({
  	     text: 'Add',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButtonDetail',
   	     handler: grid_button_cfg.createDetailHandler
   	 });
   	 
   	 
	tbarx.push('-');
	tbarx.push({
  	     text: 'Delete',
   	     iconCls: 'icon-chart-delete',
   	      id: 'globalDetailButtonDetail',
   	     handler: grid_button_cfg.deleteDetailHandler
   	 });
   	 
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	id: grid_id,
        autoWidth:true,
        height:Lheight,
           stripeRows: true,
    	enableColumnHide: false,
   //     title:grid_title+' List',
        store: grid_store,
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [updateDetail],
        tbar: tbarx,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
}



var getMainGridNoAddDelete = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,Lwidth,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	 
	var gridExport = [];
	/*if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	*/
	
	//var sm = new Ext.grid.CheckboxSelectionModel({
		//checkOnly: true
		//,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
         //   var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
           // if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
             //   })
	//});
	
	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	
	if (grid_button_cfg.actionPos == "right") 
	    grid_columns.push(update);
	 
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") 
	    grid_columns.push(update);
	 
	
	//grid_columns.push(sm);
	grid_columns.reverse();

	update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	if (grid_filter.length > 0) {
		var filter_combobox = new Ext.form.ComboBox({
	   		store: grid_filter, id: grid_id+'_filter_key',
	   		editable: false, mode: 'local', forceSelection: true,
	   		triggerAction: 'all', fieldLabel: 'Filter', width: 200
	   		});
		
		filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
		
		tbar.push(filter_combobox);
		tbar.push(' &nbsp; ');
		tbar.push(' &nbsp; ');
		tbar.push(' ');
		tbar.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value',
       		width:200
       	}));
       	
		tbar.push(' &nbsp; ');
       	 tbar.push(' ');
       	 
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		tbar.push(' &nbsp; ');
		tbar.push('-');
	}				
   	 
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
    return new Ext.grid.GridPanel({
    	id: grid_id,
        width:Lwidth,    	 
        height:Lheight,
        stripeRows: true,
    	enableColumnHide: false,
        //title:grid_title+' List',
        store: grid_store,
        //sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [update],
        tbar: tbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
}


var getMainGridWbs = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,Lwidth,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	if (Lheight.length == 0){
	    Lheight=300;
	}
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	
	
	var addItem = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-add'
			,tooltip:'Add Query'
		}]
	});
	
	
	if (grid_button_cfg.actionPos == "right") 
	    grid_columns.push(update);
	 
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") 
	    grid_columns.push(update);
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();

	update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	if (grid_filter.length > 0) {
		var filter_combobox = new Ext.form.ComboBox({
	   		store: grid_filter, id: grid_id+'_filter_key',
	   		editable: false, mode: 'local', forceSelection: true,
	   		triggerAction: 'all', fieldLabel: 'Filter', width: 200
	   		});
		
		filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
		
		tbar.push(filter_combobox);
		tbar.push(' ');
		tbar.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value',
       		width:200
       	}));
       	
		tbar.push(' &nbsp; ');
       	 tbar.push(' ');
       	 
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		tbar.push(' &nbsp; ');
		tbar.push('-');
	}		
	
	tbar.push({
  	     text: 'Add',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	 });
   	 
   	 
	
   	 
   	 tbar.push('-');
	tbar.push({
  	     text: 'Delete',
   	     iconCls: 'icon-chart-delete',
   	     handler: grid_button_cfg.deleteHandler
   	 });
   	 
 /* tbar.push('-');
	tbar.push({
  	     text: 'Append',
   	     iconCls: 'icon-chart-append',
   	     handler: grid_button_cfg.appendHandler
   	 });
  */
 
   	 
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	id: grid_id,
        autoWidth:true,
           stripeRows: true,
        //autoHeight:true,
        height:Lheight,
    	enableColumnHide: false,
        title:grid_title+' List',
        store: grid_store,
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [update],
        tbar: tbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
}

 

var getMainGridXML = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,Lwidth,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	if (Lheight.length == 0){
	    Lheight=300;
	}
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	
	
	
	/*
	var addItem = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-add'
			,tooltip:'Add Query'
		}]
	});
	*/
	
	if (grid_button_cfg.actionPos == "right") 
	    grid_columns.push(update);
	 
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") 
	    grid_columns.push(update);
	 
	
	//grid_columns.push(sm);
	grid_columns.reverse();

	update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	if (grid_filter.length > 0) {
		var filter_combobox = new Ext.form.ComboBox({
	   		store: grid_filter, id: grid_id+'_filter_key',
	   		editable: false, mode: 'local', forceSelection: true,
	   		triggerAction: 'all', fieldLabel: 'Filter', width: 100
	   		});
		
		filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
		
		tbar.push(filter_combobox);
		tbar.push(' ');
		tbar.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value'
       	}));
		
		tbar.push(' &nbsp; ');
		tbar.push(' ');
		
		tbar.push(' &nbsp; ');
		tbar.push('-');
	}
	   tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
	   
	
	/*
	tbar.push({
  	     text: 'Add',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	 });
   	 
   	 
	tbar.push('-');
	tbar.push({
  	     text: 'Delete',
   	     iconCls: 'icon-chart-delete',
   	     handler: grid_button_cfg.deleteHandler
   	 });
   	 */
	
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
    return new Ext.grid.GridPanel({
    	id: grid_id,
       autoWidth:true,
        height:Lheight,
           stripeRows: true,
    	enableColumnHide: false,
        title:grid_title+' List',
        store: grid_store,
       // sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [update],
        tbar: tbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		}
        //,bbar: bbar
    });
}


var getMainGridFormula = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,Lwidth,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	if (Lheight.length == 0){
	    Lheight=300;
	}
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	
	/*
	var addItem = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-add'
			,tooltip:'Add Query'
		}]
	});
	*/
	
	if (grid_button_cfg.actionPos == "right") 
	    grid_columns.push(update);
	 
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") 
	    grid_columns.push(update);
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();

	update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	if (grid_filter.length > 0) {
		var filter_combobox = new Ext.form.ComboBox({
	   		store: grid_filter, id: grid_id+'_filter_key',
	   		editable: false, mode: 'local', forceSelection: true,
	   		triggerAction: 'all', fieldLabel: 'Filter', width: 100
	   		});
		
		filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
		
		tbar.push(filter_combobox);
		tbar.push(' ');
		tbar.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value'
       	}));
		
		tbar.push(' &nbsp; ');
		tbar.push(' ');
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		tbar.push(' &nbsp; ');
		//tbar.push('-');
	   }
	   
/*	tbar.push({
  	     text: 'Add Query',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.addItemHandler
   	 });
   	 */
   	 
   	 
	tbar.push('-');
	tbar.push({
  	     text: 'Delete Record',
   	     iconCls: 'icon-chart-delete',
   	     handler: grid_button_cfg.deleteHandler
   	 });
	
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	id: grid_id,
       autoWidth:true,
       // autoHeight:true,
        height:Lheight,
           stripeRows: true,
    	enableColumnHide: false,
        title:grid_title+' List',
        store: grid_store,
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [update],
        tbar: tbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
}


var getMainGridCRUD = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	
	if (grid_button_cfg.actionPos == "right") grid_columns.push(update);
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") grid_columns.push(update);
	grid_columns.push(sm);
	grid_columns.reverse();

	update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	if (grid_filter.length > 0) {
		var filter_combobox = new Ext.form.ComboBox({
	   		store: grid_filter, id: grid_id+'_filter_key',
	   		editable: false, mode: 'local', forceSelection: true,
	   		triggerAction: 'all', fieldLabel: 'Filter', width: 100
	   		});
		
		filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
		
		tbar.push(filter_combobox);
		tbar.push(' ');
		tbar.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value'
       	}));
		
       	 tbar.push(' ');
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		tbar.push(' &nbsp; ');
		tbar.push('-');
		tbar.push(' &nbsp; ');
		}else{
		tbar.push(' ');
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		
	}
	tbar.push({
  	     text: 'Add Record',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	 });
	tbar.push('-');
	tbar.push({
  	     text: 'Delete Record',
   	     iconCls: 'icon-chart-delete',
   	     handler: grid_button_cfg.deleteHandler
   	 });
	
   	
	
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	id: grid_id,
       autoWidth:true,
      // height:300,
        height:460,        
           stripeRows: true,
    	enableColumnHide: false,
        title:grid_title+' List',
        store: grid_store,
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [update],
        tbar: tbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
}


// tambahan jalil
var getMainGridAudit = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";	
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	var tbar = [];
		tbar.push(' ');
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
    return new Ext.grid.GridPanel({
    	id: grid_id,
        autoWidth:true,   
        height:450,        
           stripeRows: true,
    	enableColumnHide: false,
        title:grid_title+' List',
        store: grid_store,
        //sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        // plugins: [update],
        tbar: tbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
} 
var getMainGridCommon = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,wi,he) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";	
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	var tbar = [];
		tbar.push(' ');
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	
	var gridCommon =	     new Ext.grid.GridPanel({
		    	id: grid_id,
		        autoWidth:true,   
		        height: he,        
		    	enableColumnHide: false,
		        title:grid_title+' List',
		           stripeRows: true,
		        store: grid_store,
		        //sm: sm,
		        trackMouseOver:false,
		        loadMask: true,
		        columns: grid_columns,
		        // plugins: [update],
		        tbar: tbar,
		        viewConfig: {
		        	forceFit: grid_button_cfg.autofitGrid
				},
		        bbar: bbar
    });
	
	return gridCommon;
}



var getMainGridCommonFilter = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,wi,he) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";	
	
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var tbar = [];
	if (grid_filter.length > 0) {
		var filter_combobox = new Ext.form.ComboBox({
	   		store: grid_filter, id: grid_id+'_filter_key',
	   		editable: false, mode: 'local', forceSelection: true,
	   		triggerAction: 'all', fieldLabel: 'Filter', width: 200
	   		});
		
		filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
		
		tbar.push(filter_combobox);
		tbar.push(' ');
		tbar.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value',
       		 width: 200
       	}));
		
       	 tbar.push(' ');
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		tbar.push(' &nbsp; ');
		tbar.push('-');
		tbar.push(' &nbsp; ');
		}else{
		tbar.push(' ');
		tbar.push({
	  	     text: 'Seacrh',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		
	}
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	
	var gridCommon =	     new Ext.grid.GridPanel({
		    	id: grid_id,
		        autoWidth:true,   
		        height: he,        
		           stripeRows: true,
		    	enableColumnHide: false,
		       // title:grid_title+' List',
		        store: grid_store,
		        //sm: sm,
		        trackMouseOver:false,
		        loadMask: true,
		        columns: grid_columns,
		        // plugins: [update],
		        tbar: tbar,
		        viewConfig: {
		        	forceFit: grid_button_cfg.autofitGrid
				},
		        bbar: bbar
    });
	
	return gridCommon;
}



var getMainGridUM = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	//if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	//else grid_button_cfg.actionPos = "left";
	grid_button_cfg.actionPos = "right";
	
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	
	/*
	grid_columns.push(sm);
	grid_columns.reverse();
    */

	//if (grid_button_cfg.actionPos == "right") grid_columns.push(update);
	//grid_columns.reverse();
	//if (grid_button_cfg.actionPos == "left") grid_columns.push(update);
    
    grid_columns.push(update);
    grid_columns.reverse();
	update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	if (grid_filter.length > 0) {
		var filter_combobox = new Ext.form.ComboBox({
	   		store: grid_filter, id: grid_id+'_filter_key',
	   		editable: false, mode: 'local', forceSelection: true,
	   		triggerAction: 'all', fieldLabel: 'Filter', width: 100
	   		});
		
		filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
		
		tbar.push(filter_combobox);
		tbar.push(' ');
		tbar.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value'
       	}));
       	
       	 tbar.push(' ');
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		tbar.push(' &nbsp; ');
		tbar.push('-');
		tbar.push(' &nbsp; ');
		}else{
		tbar.push(' ');
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		
	}
	// add record dan delete record dimatiin
	/*
	tbar.push({
  	     text: 'Add Record',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	 });
	tbar.push('-');
	tbar.push({
  	     text: 'Delete Record',
   	     iconCls: 'icon-chart-delete',
   	     handler: grid_button_cfg.deleteHandler
   	 });
   	 */
   	 
   	
	
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	id: grid_id,
        autoWidth:true,
           stripeRows: true,
       autoHeight:true,
       // height:490,        
    	enableColumnHide: false,
        title:grid_title+' List',
        store: grid_store,
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [update],
        tbar: tbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
} // end of tambahan jalil

// Tambahan Jalil
var getModalWindowUM = function(title, form, buttons) {
	return new Ext.Window({
		title: title,
		width: 700,
		autoHeight:true,
		minWidth: 700,
		minHeight: 200,
		modal:true,
        maximizable: true,
		layout: 'fit',
		plain:true,
		resizable: true,
		bodyStyle:'padding:5px;',
		buttonAlign:'center',
		closeAction:'hide',
		items: form,
		buttons: buttons,
		listeners: {
			'show': function(xwin) { xwin.center(); }
		}
	});
} // end of tambahan jalil

var getModalWindow = function(title, form, buttons) {
	return new Ext.Window({
		title: title,
		width: 500,
		height:250,
		minWidth: 400,
		minHeight: 200,
		modal:true,
		layout: 'fit',
		plain:true,
		resizable: false,
		bodyStyle:'padding:5px;',
		buttonAlign:'center',
		closeAction:'hide',
		items: form,
		buttons: buttons,
		listeners: {
			'show': function(xwin) { xwin.center(); }
		}
	});
}

var getModalWindowCustom = function(title, form, buttons,x,y) {
	return new Ext.Window({
		title: title,
		width: y,
		height: x,
		//autoHeight:true,
		minWidth: y,
		minHeight: 200,
		modal:true,
		layout: 'fit',
		plain:true,
		resizable: false,
		bodyStyle:'padding:5px;',
		buttonAlign:'center',
		closeAction:'hide',
		items: form,
		buttons: buttons,
		listeners: {
			'show': function(xwin) { xwin.center(); }
		}
	});
}


var getModalWindowCustom2 = function(title, form, buttons,h,w) {
	return new Ext.Window({
		title: title,
		width: w,
		height:h,
		minWidth: w - 100,
		minHeight: h - 50,
		modal:true,
		layout: 'fit',
		plain:true,
		resizable: false,
		bodyStyle:'padding:5px;',
		buttonAlign:'center',
		closeAction:'hide',
		items: form,
		buttons: buttons,
		listeners: {
			'show': function(xwin) { xwin.center(); }
		}
	});
}


//getModalWindowDetail


var getModalWindowSales = function(title, form, buttons) {
	return new Ext.Window({
		title: title,
		width: 600,
		height:510,
		//minWidth: 400,
		//minHeight: 200,
		modal:true,
		layout: 'fit',
		plain:true,
		resizable: false,
		bodyStyle:'padding:5px;',
		buttonAlign:'center',
		closeAction:'hide',
		items: form,
		buttons: buttons,
		listeners: {
			'show': function(xwin) { xwin.center(); }
		}
	});
}



var getModalWindowComment = function(title, form, buttons) {
	return new Ext.Window({
		title: title,
		width:820 ,
		height:520,
		minWidth: 400,
		minHeight: 200,
		modal:true,
		layout: 'fit',
		//plain:true,
		draggable   : false,
		resizable: false,
		//bodyStyle:'padding:5px;',
		buttonAlign:'center',
		closeAction:'hide',
		items: form,
		buttons: buttons,
		listeners: {
			'show': function(xwin) { xwin.center(); }
		}
	});
}



var getModalWindowXML = function(title, form, buttons) {
	return new Ext.Window({
		title: title,
		width: 600,
		autoHeight:true,
		minWidth: 600,
		minHeight: 360,
		modal:true,
		layout: 'fit',
		plain:true,
		resizable: false,
		bodyStyle:'padding:5px;',
		buttonAlign:'center',
		closeAction:'hide',
		items: form,
		buttons: buttons,
		listeners: {
			'show': function(xwin) { xwin.center(); }
		}
	});
}

var getModalWindowChart= function(title, form, buttons) {
	return new Ext.Window({
		title: title,
		width: 600,
		height:400,
		minWidth: 600,
		minHeight: 400,
		modal:true,
		//layout: 'fit',
		plain:true,
		resizable: false,
		bodyStyle:'padding:5px;',
		buttonAlign:'center',
		//closeAction:'hide',
		items: form,
		buttons: buttons,
		listeners: {
			'show': function(xwin) { xwin.center(); }
		}
	});
}

var getModalWindowExport= function(title, form, buttons) {
	return new Ext.Window({
		title: title,
		width: 400,
		height:150,
		minWidth: 400,
		minHeight: 150,
		modal:true,
		//layout: 'fit',
		plain:true,
		resizable: false,
		bodyStyle:'padding:5px;',
		buttonAlign:'center',
		closeAction:'hide',
		items: form,
		buttons: buttons,
		listeners: {
			'show': function(xwin) { xwin.center(); }
		}
	});
}

var getExportWindow = function(exportFnHandler) {
	// export window
    var winFormExport = new Ext.form.FormPanel({
        baseCls: 'x-plain', 
        labelWidth: 100, 
        height:60,
        autoWidth:true,
        standardSubmit: true,
        id:'mainFormExport',       
        items: [
	        new Ext.form.ComboBox({
	            xtype:'combobox',
	            //,['pdf', 'PDF']
				store: [['csv', 'XLS']],
				editable: false, mode: 'local', forceSelection: true, triggerAction: 'all',
				fieldLabel: 'Export Type', value:'csv', hiddenName: 'export_type', width: 80,
				labelStyle: 'color:black'
			})
		,{ xtype:'hidden', name:'filter' }
        ,{ xtype:'hidden', name:'sort' }
        ,{ xtype:'hidden', name:'dir' }
		]
    });

	var winButtonExport = [{
		text:'Export Data',
		handler: exportFnHandler
	}];		
	
	return getModalWindowExport('Export Data', winFormExport, winButtonExport);
}


/* ------------------ Untuk Process group ----------------------- */
var getProcessGroup = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	
	var gridExport = [];
	
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Stop',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	//var sm = new Ext.grid.CheckboxSelectionModel({
	//	checkOnly: true
	//});
	
	var view = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-view-group'
			,tooltip:'view detail'
		}]
	});
	
	if (grid_button_cfg.actionPos == "right") grid_columns.push(view);
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") grid_columns.push(view);
	//grid_columns.push(sm);
	grid_columns.reverse();

	view.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	if (grid_filter.length > 0) {
		var filter_combobox = new Ext.form.ComboBox({
	   		store: grid_filter, id: grid_id+'_filter_key',
	   		editable: false, mode: 'local', forceSelection: true,
	   		triggerAction: 'all', fieldLabel: 'Filter', width: 100
	   		});
		
		filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
		
		tbar.push(filter_combobox);
		tbar.push(' ');
		tbar.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value'
       	}));
		tbar.push(' ');
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		tbar.push(' &nbsp; ');
		tbar.push('-');
		tbar.push(' &nbsp; ');
	}
	/*
	tbar.push({
  	     text: 'Start',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	 });
	tbar.push('-');
	tbar.push({
  	     text: 'Stop',
   	     iconCls: 'icon-chart-delete',
   	     handler: grid_button_cfg.deleteHandler
   	 });
	*/
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	 frame:false,
         collapsible: true,
         animCollapse: false,
    	 id: grid_id,
    	    stripeRows: true,
         autoWidth:true,
        // autoHeight:true,
        height:180,
    	enableColumnHide: false,
        title:grid_title+' List',
        store: grid_store,
        //sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [view],
        tbar: tbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
}


var getDetailGroup = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	
	var gridExport = [];
	
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	var view = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-view-process'
			,tooltip:'view flow process'
		}]
	});
	
	if (grid_button_cfg.actionPos == "right") grid_columns.push(view);
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") grid_columns.push(view);
	grid_columns.push(sm);
	grid_columns.reverse();

	view.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	if (grid_filter.length > 0) {
		var filter_combobox = new Ext.form.ComboBox({
	   		store: grid_filter, id: grid_id+'_filter_key',
	   		editable: false, mode: 'local', forceSelection: true,
	   		triggerAction: 'all', fieldLabel: 'Filter', width: 100
	   		});
		
		filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
		
		tbar.push(filter_combobox);
		tbar.push(' ');
		tbar.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value'
       	}));
		tbar.push(' ');
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		tbar.push(' &nbsp; ');
		tbar.push('-');
		tbar.push(' &nbsp; ');
	}
	/*
	tbar.push({
  	     text: 'Start',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	 });
	tbar.push('-');
	tbar.push({
  	     text: 'Stop',
   	     iconCls: 'icon-chart-delete',
   	     handler: grid_button_cfg.deleteHandler
   	 });
	*/
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	 frame:false,
         collapsible: true,
            stripeRows: true,
         animCollapse: false,
    	id: grid_id,
        autoWidth:true,
        autoHeight:true,
       // height:275,
    	enableColumnHide: false,
        title:grid_title+' List',
        store: grid_store,
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [view],
        tbar: tbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
    
}


var dispatch = function(){
       Ext.Msg.alert('Session Expired', 'Your session expired. Please login to start a new session.',
            function (btn, text) {                                                 
			if (btn == 'ok') {
				 window.parent.location='<%=ResolveUrl("~/Home/Logout")%>';						                                  		 					
				 }                                                            
     });    	
}

var sessionCheck = function(msg){
if (msg == "Object reference not set to an instance of an object."){
       return true;
}else{
    return false;
}

}
    
    /*-------- ini buat history ----------------------- */
    
    var getGridHistory = function(grid_id, grid_title, grid_store, grid_columns,grid_button_cfg) {
       
    	//view.on('action', grid_button_cfg.updateHandler);
    	
    	var tbar = [];
    	
    	
    	tbar.push('From Date');
        tbar.push( new Ext.form.DateField({
            name: 'fromdate',
            id: 'startdt',
            vtype: 'daterange',
    			format: 'd/m/Y',
    			endDateField: 'enddt'
       	}));
        tbar.push('To');
        tbar.push( new Ext.form.DateField({
            fieldLabel: 'To Date',
            name: 'todate',
            id: 'enddt',
    			vtype: 'daterange',
    			format: 'd/m/Y',
    	        startDateField: 'startdt'
        }));
        tbar.push(' ');
        tbar.push(' ');
        tbar.push('Process Id');
    	tbar.push(new Ext.form.TextField ({
    		id: 'process_id',
    			name: 'process_id'
       	}));
    	tbar.push(' ');
    	tbar.push(' ');
        tbar.push('Message');
    	tbar.push(new Ext.form.TextField ({
    		id: 'message',
    		name: 'message'
       	}));
        
    		tbar.push(' ');
    		tbar.push({
    	  	     text: 'Search',
    	  	     iconCls: 'x-tbar-loading',
    	   	     handler: grid_button_cfg.readHandler
    	   	 });
    		tbar.push(' &nbsp; ');
    		tbar.push('-');
    		tbar.push(' &nbsp; ');
    	
    	var bbar = new Ext.PagingToolbar({
            pageSize: pagingSize,
            store: grid_store,
            displayInfo: true,
            displayMsg: 'Displaying records {0} - {1} of {2}',
            emptyMsg: "No records to display"
          //  items:gridExport
        });
    	
    	bbar.refresh.hideParent = true;
    	bbar.refresh.hide();
        return new Ext.grid.GridPanel({
        	 frame:false,
             collapsible: true,
             animCollapse: false,
        	id: grid_id,
        	   stripeRows: true,
            autoWidth:true,
            autoHeight:true,
        	enableColumnHide: false,
            title:grid_title+' List',
            store: grid_store,            
            trackMouseOver:false,
            loadMask: true,
            columns: grid_columns,
         //   plugins: [view],
            tbar: tbar,
           // viewConfig: {
            //	forceFit: grid_button_cfg.autofitGrid
    		//},
            bbar: bbar
        });
        
    	
    }    	

    var getMainGridForum = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,Lwidth,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	if (Lheight.length == 0){
	    Lheight=300;
	}
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	
	/*
	var addItem = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-add'
			,tooltip:'Add Query'
		}]
	});
	*/
	
	if (grid_button_cfg.actionPos == "right") 
	    grid_columns.push(update);
	 
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") 
	    grid_columns.push(update);
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();

	update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	if (grid_filter.length > 0) {
		var filter_combobox = new Ext.form.ComboBox({
	   		store: grid_filter, id: grid_id+'_filter_key',
	   		editable: false, mode: 'local', forceSelection: true,
	   		triggerAction: 'all', fieldLabel: 'Filter', width: 100
	   		});
		
		filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
		
		tbar.push(filter_combobox);
		tbar.push(' ');
		tbar.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value'
       	}));
       	
		tbar.push(' &nbsp; ');
       	tbar.push(' ');
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		tbar.push(' &nbsp; ');
		tbar.push('-');
	}		
	
	/*tbar.push({
  	     text: 'Add',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	 });
   	 
   	 
	tbar.push('-');
	tbar.push({
  	     text: 'Delete',
   	     iconCls: 'icon-chart-delete',
   	     handler: grid_button_cfg.deleteHandler
   	 });
   	 */
   	 
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	id: grid_id,
        autoWidth:true,
        //autoHeight:true,
           stripeRows: true,
        height:Lheight,
    	enableColumnHide: false,
        title:grid_title+' List',
        store: grid_store,
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [update],
        tbar: tbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
}

function is_int(value){
  if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
      return false;
  } else {
      return true;
  }
}

function getInternetExplorerVersion() {

    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}


/* Tambahan Untuj=k SO Number List */
var getGridSO = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,Lwidth,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	
	
	else grid_button_cfg.actionPos = "left";
	if (Lheight.length == 0){
	    Lheight=300;
	}
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	
	
	
	 
	grid_columns.reverse();
	grid_columns.push(sm);
	grid_columns.reverse();

	//update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	
	
	tbar.push('-');
	tbar.push({
  	     text: 'Delete',
   	     iconCls: 'icon-chart-delete',
   	     handler: grid_button_cfg.deleteHandler
   	 });
   	 
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	id: grid_id,
        width:Lwidth,
        height:Lheight,
    	enableColumnHide: false,
       // title:grid_title+' List',
           stripeRows: true,
        store: grid_store,
        sm: sm,       
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        tbar: tbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		}
        //bbar: bbar
    });
}



var getGridMemory = function(grid_id, grid_title, grid_store, grid_columns, grid_button_cfg,Lwidth,Lheight) {

var tbar = [];
if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	
/*var sm = new Ext.grid.CheckboxSelectionModel({
        listeners: {
            rowselect: function(smObj, rowIndex, record) {
                delButton.show();
            },
            rowdeselect: function(smObj, rowIndex, record) {
                delButton.hide();
            }
        }
    });
    */
  var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		
	});
  var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	
    grid_columns.reverse();
    //if (grid_button_cfg.actionPos == "left") 
	  //  grid_columns.push(update);
	grid_columns.push(sm);
	grid_columns.reverse();
	
	//update.on('action', grid_button_cfg.updateHandler);
	 /*
    var addButton = new Ext.Button({
        text: 'Add',
        scope: this,
        hidden: false,
        handler: function() {            
            dataStore.add(new soNumber({
                so_number: 'Ned1111111'   
            }));
        }
    });

    tbar.push(addButton);

   var delButton = new Ext.Button({
        text: 'Remove selected',
        scope: this,
        hidden: true,
        handler: function() {
 
            var selected = Ext.getCmp(grid_id).getSelectionModel().getSelections();
 
            if(selected.length>0) {
                for(var i=0;i<selected.length;i++) {
                    dataStore.remove(selected[i]);
                }
            }
        }
    });
   
    tbar.push(delButton);  
     */  
     if (grid_button_cfg.createHandler != undefined){
     tbar.push({
  	     text: 'Add',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	 });
   	 }
   	if (grid_button_cfg.deleteHandler != undefined){
   	tbar.push(' &nbsp; ');
    tbar.push(' ');
    tbar.push({
  	     text: 'Delete',
   	     iconCls: 'icon-chart-delete',
   	     handler: grid_button_cfg.deleteHandler
   	 });
   	 }
   	
   	
    
  //return new Ext.grid.GridPanel({
    	return	new Ext.grid.EditorGridPanel({
          id: grid_id
         ,store: grid_store         
         ,clicksToEdit: 1
         ,sm: sm
         ,columns: grid_columns
         ,width:Lwidth
         ,height:Lheight
         ,tbar: tbar
         ,enableColumnHide: false
         ,stripeRows: true
         ,trackMouseOver:false
         ,loadMask: true
        //,plugins: [update]
         ,selModel: new Ext.grid.RowSelectionModel({
            singleSelect: true
         })
        ,viewConfig: {
            forceFit: grid_button_cfg.autofitGrid
        }
        ,collapsible: false
    });

    
 }
 
 
 

var getGridUploadFile = function(grid_id, grid_title, grid_store, grid_columns, grid_button_cfg,Lwidth,Lheight) {

	var tbar = [];
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
		if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
		else grid_button_cfg.actionPos = "left";		
		var sm = new Ext.grid.CheckboxSelectionModel({
			checkOnly: true
			,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
	            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
	            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
	                })
		});

		//if (grid_button_cfg.actionPos == "right") 
		//	grid_columns.push(view);
		   grid_columns.reverse();
		//if (grid_button_cfg.actionPos == "left") 
		//grid_columns.push(view);
		 grid_columns.push(sm);
		grid_columns.reverse();
		
	     if (grid_button_cfg.createHandler != undefined){
			     tbar.push({
			  	     text: 'Add',
			   	     iconCls: 'icon-chart-add',	   	     
			   	     handler: grid_button_cfg.createHandler
			   	 });
	   	 }
	   	if (grid_button_cfg.deleteHandler != undefined){
		   	tbar.push(' &nbsp; ');
		    tbar.push(' ');
		    tbar.push({
		  	     text: 'Delete',
		   	     iconCls: 'icon-chart-delete',
		   	     handler: grid_button_cfg.deleteHandler
		   	 });
	   	 }
	   	
	   	

	 return new Ext.grid.GridPanel({
	 
	        id: grid_id
	         ,store: grid_store	
	         ,sm: sm 
	        ,width:Lwidth
	        ,height:Lheight
	        ,tbar: tbar
	        ,enableColumnHide: false
	        ,stripeRows: true
	        ,trackMouseOver:false
	        ,loadMask: true	   
	        ,columns: grid_columns
	       
	       // ,selModel: new Ext.grid.RowSelectionModel({
	        //    singleSelect: false
	        //})
	        ,viewConfig: {	             
	            forceFit: grid_button_cfg.autofitGrid
	        }
	       ,collapsible: false
	    });

	    
	 }
	 
 
 
 var getActivityGrid = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,x,y) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	
	var gridExport = [];
	
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	var view = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-view-process'
			,tooltip:'view transaction'
		}]
	});
	
	if (grid_button_cfg.actionPos == "right") grid_columns.push(view);
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") grid_columns.push(view);
	//grid_columns.push(sm);
	grid_columns.reverse();

	view.on('action', grid_button_cfg.viewHandler);
	
	var tbar = [];
	
	if (grid_filter.length > 0) {
		var filter_combobox = new Ext.form.ComboBox({
	   		store: grid_filter, id: grid_id+'_filter_key',
	   		editable: false, 
	   		mode: 'local', 
	   		forceSelection: true,
	   		triggerAction: 'all', 
	   		fieldLabel: 'Filter', 
	   		width: 200,
	   		listeners:{
	   		        select:function(combo, record, index) {
	   		        if (record.data.field1 =='approved_1_date' || record.data.field1 =='approved_2_date' || record.data.field1 =='rejected_date' ){
	   		            Ext.getCmp(grid_id+'_filter_value2').show();
	   		            Ext.getCmp(grid_id+'_filter_value').hide();	   		           
	   		       }else{
	   		           Ext.getCmp(grid_id+'_filter_value2').hide();	  		        
	   		           Ext.getCmp(grid_id+'_filter_value').show();
	   		        }
	   		      } 
	   		    }
	   		
	   		});
		
		filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
		
		tbar.push(filter_combobox);
		tbar.push(' ');
		
		/*
		tbar.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value',
       		width:200
       	}));
       	*/
       	tbar.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value',
       		width:200,
       		hidden:false
       	}));

       	tbar.push(new Ext.form.DateField  ({
       		id: grid_id+'_filter_value2',
       		width:200,
       		hidden:true,
       		format: 'm/d/Y'
       	}));
       	
       	
       	
		tbar.push(' ');
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		tbar.push(' &nbsp; ');
		tbar.push('-');
		tbar.push(' &nbsp; ');
	}
	
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
    return new Ext.grid.GridPanel({
    	 frame:false,
         //collapsible: true,
            stripeRows: true,
         //animCollapse: false,
    	id: grid_id,
        autoWidth:true,
        //autoHeight:true,
        height:x,
        //width:y,
    	enableColumnHide: false,
       // title:grid_title+' List',
        store: grid_store,
       // sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [view],
        tbar: tbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
    
}






var getApprovalGrid = function(grid_id, grid_title, grid_store, grid_columns, x,y) {
 	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display"
       // ,items:gridExport
    });
 
	
 	bbar.refresh.hideParent = true;
	 bbar.refresh.hide();
    return new Ext.grid.GridPanel({
    	 frame:false,
       stripeRows: true,
 
    	id: grid_id,
    	//width:y,
        autoWidth:true,
         //autoHeight:true,    
         height:x,     
    	enableColumnHide: false,
        //title:grid_title+' List',
        store: grid_store,
       //sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns
        //plugins: [view],
       // tbar: tbar,
        
      // ,bbar: bbar
    });
    
}




var getGridWBSTransaction = function(grid_id, grid_title, grid_store, grid_columns,  grid_button_cfg,Lwidth,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	if (Lheight.length == 0){
	    Lheight=300;
	}
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	/*  var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-add'
			,tooltip:'Edit Record'
		}]
	});
	 
	*/
	 
	
	//if (grid_button_cfg.actionPos == "right") 
	  //  grid_columns.push(update);
	 
	grid_columns.reverse();
	// if (grid_button_cfg.actionPos == "left") 
	  //  grid_columns.push(update);
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();

	// update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	var bottomBar = [];
	
	 
	tbar.push({
  	     text: 'Add Position Title',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	     
   	 });
   	 
   	 bottomBar.push({
  	     text: 'Add Position Title',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton1',
   	     handler: grid_button_cfg.createHandler
   	     
   	 });
   	  
   	 
   	 
	
   	 
   	 tbar.push('-');
   	 bottomBar.push('-');
   	 
   	
	tbar.push({
  	     text: 'Delete',
   	     iconCls: 'icon-chart-delete',
   	       id: 'globalDeleteButton',
   	     handler: grid_button_cfg.deleteHandler
   	 });
   	 bottomBar.push({
  	     text: 'Delete',
   	     iconCls: 'icon-chart-delete',
   	       id: 'globalDeleteButton1',
   	     handler: grid_button_cfg.deleteHandler
   	 });
   	 
 /* tbar.push('-');
	tbar.push({
  	     text: 'Append',
   	     iconCls: 'icon-chart-append',
   	     handler: grid_button_cfg.appendHandler
   	 });
  */
 
   	 
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	
	//var cm = new Ext.grid.ColumnModel({         
     //   columns: grid_columns 
    //});
	
	
    return new  Ext.grid.EditorGridPanel({
    	id: grid_id,
        autoWidth:true,
           stripeRows: true,
           clicksToEdit: 1,
        //autoHeight:true,
        autoHeight:true,
    	enableColumnHide: false,
        title:grid_title+' List',
        store: grid_store,
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        //cm:cm,
      // plugins: [update],
        tbar: tbar,
         bbar: bottomBar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		}
		/*listeners: {
                beforeedit: function (e) {
                    if (e.record.get('disabled')) {
                        return false;
                    }
                },
                afteredit: function (e) {
                    // use afteredit event
                    if (cm.getDataIndex(e.column) == 'date') {
                        e.record.set(cm.getDataIndex(e.column), Ext.util.Format.date(e.value, 'm/d/Y'));
                    }
                }
           },
           */
        //,bbar: bbar
    });
}





var getApprovalWbsGrid = function(grid_id, grid_title, grid_store, grid_columns, x,y) {
/*	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display"
       // ,items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	*/
    return new Ext.grid.GridPanel({
    	 frame:false,
         //collapsible: true,
            stripeRows: true,
         //animCollapse: false,
    	id: grid_id,
        autoWidth:true,
        
      autoHeight:true,
    	enableColumnHide: false,
        title:grid_title+' List',
       // height:x,
        //width:y,
     
      // // title:grid_title+' List',
        store: grid_store,
       //sm: sm,
       // trackMouseOver:false,
       // loadMask: true,
        columns: grid_columns
        //plugins: [view],
       // tbar: tbar,
        
       // ,bbar: bbar
        ,viewConfig: {
        	forceFit: true
		}
    });
    
}


var verifyEmail=function(n){
var status = false;     
var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
     if (n.search(emailRegEx) == -1) {
          status = false;
     }
      
     else {
         
          status = true;
     }
     return status;
}




var getTimeReportGrid = function(grid_id, grid_title, grid_store, grid_columns, grid_button_cfg,Lwidth,Lheight) {

    var tbar = [];
    if (grid_button_cfg.autofitGrid == undefined) {
        grid_button_cfg.autofitGrid = true;
    }
    if (grid_button_cfg.actionPos == undefined) {
        grid_button_cfg.actionPos = "right";
    } else {
        grid_button_cfg.actionPos = "left";
    }
    
    var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	 
	
	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	
	if (grid_button_cfg.actionPos == "right") 
	    grid_columns.push(update);
	 
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") 
	    grid_columns.push(update);
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();

	update.on('action', grid_button_cfg.updateHandler);    
	
    /* if (grid_button_cfg.createHandler != undefined){
     tbar.push({
  	     text: 'Add',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	 });
   	 }
   	if (grid_button_cfg.deleteHandler != undefined){
   	    tbar.push(' &nbsp; ');
        tbar.push(' ');
        tbar.push({
  	         text: 'Delete',
   	         iconCls: 'icon-chart-delete',
   	         handler: grid_button_cfg.deleteHandler
   	     });
   	 }
   	 */
   	 tbar.push({
	  	     text: 'refresh',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
    
    return new Ext.grid.GridPanel({
        id: grid_id
        ,store: grid_store
        ,sm: sm
      //  ,plugins: [update]
         //,hidden:true
        ,columns: grid_columns
       // ,width:Lwidth
        ,autoWidth:true
        ,height:Lheight
        ,enableColumnHide: false
        ,tbar: tbar
        ,stripeRows: true
        ,trackMouseOver:false
        ,loadMask: true
        ,selModel: new Ext.grid.RowSelectionModel({
            singleSelect: false
        })
        ,viewConfig: {
            //forceFit: true,
            //autoFill: true
            forceFit: grid_button_cfg.autofitGrid
        }
        ,collapsible: false
    });    
 }
 
 
 //getMainGridPerson
 
 
 var getMainGridPerson = function(grid_id, grid_title, grid_store, grid_columns,Lwidth,Lheight) {

    
    return new Ext.grid.GridPanel({
        id: grid_id
        ,store: grid_store      
         //,hidden:true
        ,columns: grid_columns
        ,width:Lwidth
        ,height:Lheight
        ,stripeRows: true
        ,trackMouseOver:false
        ,loadMask: true        
        ,collapsible: false
    });    
 }
 
 
 var getGridMASTERWBSTEMPLATE = function(grid_id, grid_title, grid_store, grid_columns, grid_filter, grid_button_cfg,Lwidth,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	if (Lheight == 0){
	    Lheight=300;
	}
	/*var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	*/
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
           var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
          if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
            })
	});
	
	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-view-link'
			,tooltip:'View Detail Record'
		}]
	});
	
	
	
	if (grid_button_cfg.actionPos == "right") 
	    grid_columns.push(update);
	 
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") 
	    grid_columns.push(update);
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();

	update.on('action', grid_button_cfg.linkHandler);
	
	var tbar = [];
	if (grid_filter.length > 0) {
		var filter_combobox = new Ext.form.ComboBox({
	   		    store: grid_filter, 
	   		    id: grid_id+'_filter_key',
	   		    editable: false, 
	   		    mode: 'local', 
	   		    forceSelection: true,
	   		    triggerAction: 'all', 
	   		    fieldLabel: 'Filter', 
	   		    height:Lheight,
	   		    width: 200,
	   		    listeners:{
	   		        select:function(combo, record, index) {
	   		       
	   		        if (record.data.field1 =='default_flag'){
	   		      
	   		        Ext.getCmp(grid_id+'_filter_value2').show();
	   		         Ext.getCmp(grid_id+'_filter_value').hide();
	   		       
	   		      
	   		        }else{
	   		         Ext.getCmp(grid_id+'_filter_value2').hide();	   		        
	   		         Ext.getCmp(grid_id+'_filter_value').show();
	   		        
	   		        }
                   } 
	   		    }
	   		});
		
		filter_combobox.on('afterrender', function(cb){
			var tRec = cb.getStore().getAt(0);
			if (tRec != undefined) {
				cb.setValue(tRec.data.field1);
			}
		});
		
		tbar.push(filter_combobox);
		tbar.push(' ');
		
		tbar.push(new Ext.form.TextField ({
       		id: grid_id+'_filter_value',
       		width:200,
       		hidden:false
       	}));

       	tbar.push(new Ext.form.ComboBox({
	                 xtype:'combobox',
		             store: [['1', 'YES'],['0', 'NO']],
		             displayField:'text',
		             valueField:'value',
		             editable: false,
		             mode: 'local',
		             forceSelection: true,
		             triggerAction: 'all',
			         fieldLabel: 'Default Flag',				                   
			         hiddenName: 'default_flag',
		             id: grid_id+'_filter_value2',
		             width:200
		              ,hidden:true    
		        }));
       	
       	
		tbar.push(' &nbsp; ');
       	 tbar.push(' ');
       	 
		tbar.push({
	  	     text: 'Search',
	  	     iconCls: 'x-tbar-loading',
	   	     handler: grid_button_cfg.readHandler
	   	 });
		tbar.push(' &nbsp; ');
		tbar.push('-');
	}		
	
	tbar.push({
  	     text: 'Add',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButtonWbsTemplate',
   	     handler: grid_button_cfg.createHandler
   	 });
   	 
   	 
	tbar.push('-');
	tbar.push({
  	     text: 'Edit',
   	     iconCls: 'icon-chart-edit',
   	     id: 'viewDetail',
   	     handler: grid_button_cfg.updateHandler
   	 });
   	 
   	 
	tbar.push('-');
	tbar.push({
  	     text: 'Delete',
   	     iconCls: 'icon-chart-delete',
   	     handler: grid_button_cfg.deleteHandler
   	 });
   	 
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display"
        //,items:gridExport
    });
    
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	id: grid_id,
        autoWidth:true,
        //autoHeight:true,
        height:Lheight,
           stripeRows: true,
    	enableColumnHide: false,
        title:grid_title+' List',
        store: grid_store,
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        plugins: [update],
        tbar: tbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
}

 
 var getGridMASTERWBS = function(grid_id, grid_title, grid_store, grid_columns,  grid_button_cfg,Lwidth,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	if (Lheight.length == 0){
	    Lheight=300;
	}
/*	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	*/
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		 ,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
            
	});
	
/*	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-add'
			,tooltip:'Edit Record'
		}]
	});
	*/
	
	 
	
	//if (grid_button_cfg.actionPos == "right") 
	  //  grid_columns.push(update);
	 
	grid_columns.reverse();
	//if (grid_button_cfg.actionPos == "left") 
	 //   grid_columns.push(update);
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();

//	update.on('action', grid_button_cfg.updateHandler);
	
	var tbar = [];
	var bbar = [];
	
	 
	tbar.push({
  	     text: 'New Detail',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	     
   	 });
   	  
   	 tbar.push('-');
	tbar.push({
  	     text: 'Delete',
   	     iconCls: 'icon-chart-delete',
   	     handler: grid_button_cfg.deleteHandler
   	 });
   	 
   	 bbar.push({
  	     text: 'New Detail',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton1',
   	     handler: grid_button_cfg.createHandler
   	     
   	 });
   	  
   	 bbar.push('-');
	bbar.push({
  	     text: 'Delete',
   	     iconCls: 'icon-chart-delete',
   	       id: 'globalDeleteButton1',
   	     handler: grid_button_cfg.deleteHandler
   	 });
   	 
 /* tbar.push('-');
	tbar.push({
  	     text: 'Append',
   	     iconCls: 'icon-chart-append',
   	     handler: grid_button_cfg.appendHandler
   	 });
  */
 
   	 
	 
	
	//bbar.refresh.hideParent = true;
	//bbar.refresh.hide();
	
	//var cm = new Ext.grid.ColumnModel({         
     //   columns: grid_columns 
    //});
	
	
    return new  Ext.grid.EditorGridPanel({
    	id: grid_id,
        autoWidth:true,
           stripeRows: true,
           clicksToEdit: 1,
           border:true,
        autoHeight:true,
       // height:300,
    	enableColumnHide: false,
        title:grid_title+' List',
        store: grid_store,
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,
        //cm:cm,
       // plugins: [update],
        tbar: tbar,
        bbar:bbar,
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		}
		/*listeners: {
                beforeedit: function (e) {
                    if (e.record.get('disabled')) {
                        return false;
                    }
                },
                afteredit: function (e) {
                    // use afteredit event
                    if (cm.getDataIndex(e.column) == 'date') {
                        e.record.set(cm.getDataIndex(e.column), Ext.util.Format.date(e.value, 'm/d/Y'));
                    }
                }
           },
           */
       // ,bbar: bbar
    });
}

 
 

var getGridClosing = function(grid_id, grid_title, grid_store, grid_columns,  grid_button_cfg,Lheight) {
	if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	if (Lheight.length == 0){
	    Lheight=300;
	}
	var gridExport = [];
	if (grid_button_cfg.showExport == true) {
		gridExport = [{
		     text: 'Export Data',
		     iconCls: 'icon_Export',
		     handler: grid_button_cfg.exportHandler
		 }];
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	 
	 
	grid_columns.reverse();
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();

	 var tbar = [];
	
	 
	tbar.push({
  	     text: 'Submit',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	     
   	 });
   	  
   	 
	
	 
   	 
	var bbar = new Ext.PagingToolbar({
        pageSize: pagingSize,
        store: grid_store,
        displayInfo: true,
        displayMsg: 'Displaying records {0} - {1} of {2}',
        emptyMsg: "No records to display",
        items:gridExport
    });
	
	bbar.refresh.hideParent = true;
	bbar.refresh.hide();
	//width:defaultContWidth,
    return new Ext.grid.GridPanel({
    	id: grid_id,
        autoWidth:true,
        //autoHeight:true,
        height:Lheight,
    	enableColumnHide: false,
        title:grid_title+' List',
        stripeRows: true,
        store: grid_store,
        tbar: tbar,
        sm: sm,
        trackMouseOver:false,
        loadMask: true,
        columns: grid_columns,   
        viewConfig: {
        	forceFit: grid_button_cfg.autofitGrid
		},
        bbar: bbar
    });
}


var getAleGrid = function(grid_id, grid_title, grid_store, grid_columns, grid_button_cfg,Lwidth,Lheight) {

    var tbar = [];
    if (grid_button_cfg.autofitGrid == undefined) {
        grid_button_cfg.autofitGrid = true;
    }
    if (grid_button_cfg.actionPos == undefined) {
        grid_button_cfg.actionPos = "right";
    } else {
        grid_button_cfg.actionPos = "left";
    }
    
    var sm = new Ext.grid.CheckboxSelectionModel({
		checkOnly: true
		,clearSelections : Ext.grid.CheckboxSelectionModel.prototype.clearSelections.createSequence(function(fast){
            var hdCheckbox = this.grid.getEl().select('.x-grid3-hd-checker-on');
            if(hdCheckbox) hdCheckbox.removeClass('x-grid3-hd-checker-on');
                })
	});
	
	var update = new Ext.ux.grid.RowActions({
		 header:' '
		,widthSlope: 20
		,keepSelection:true
		,actions:[{
			iconCls:'icon-chart-edit'
			,tooltip:'Edit Record'
		}]
	});
	
	if (grid_button_cfg.actionPos == "right") 
	    grid_columns.push(update);
	 
	grid_columns.reverse();
	if (grid_button_cfg.actionPos == "left") 
	    grid_columns.push(update);
	 
	
	grid_columns.push(sm);
	grid_columns.reverse();

	update.on('action', grid_button_cfg.updateHandler);    
	
     if (grid_button_cfg.createHandler != undefined){
     tbar.push({
  	     text: 'Add',
   	     iconCls: 'icon-chart-add',
   	     id: 'globalCreateButton',
   	     handler: grid_button_cfg.createHandler
   	 });
   	 }
   	if (grid_button_cfg.deleteHandler != undefined){
   	    tbar.push(' &nbsp; ');
        tbar.push(' ');
        tbar.push({
  	         text: 'Delete',
   	         iconCls: 'icon-chart-delete',
   	         handler: grid_button_cfg.deleteHandler
   	     });
   	 }
    
    return new Ext.grid.GridPanel({
        id: grid_id
        ,store: grid_store
        ,sm: sm
        ,plugins: [update]
         //,hidden:true
        ,columns: grid_columns
        ,width:Lwidth
        ,height:Lheight
        ,tbar: tbar
        ,stripeRows: true
        ,trackMouseOver:false
        ,loadMask: true
        ,selModel: new Ext.grid.RowSelectionModel({
            singleSelect: false
        })
        ,viewConfig: {
            //forceFit: true,
            //autoFill: true
            forceFit: grid_button_cfg.autofitGrid
        }
        ,collapsible: false
    });    
 }

var checkBrowser = function(){
var BrowserDetect = {
		init: function () {
			this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
			this.version = this.searchVersion(navigator.userAgent)
				|| this.searchVersion(navigator.appVersion)
				|| "an unknown version";
			this.OS = this.searchString(this.dataOS) || "an unknown OS";
		},
		searchString: function (data) {
			for (var i=0;i<data.length;i++)	{
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1)
						return data[i].identity;
				}
				else if (dataProp)
					return data[i].identity;
			}
		},
		searchVersion: function (dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
		},
		dataBrowser: [
			{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			},
			{ 	string: navigator.userAgent,
				subString: "OmniWeb",
				versionSearch: "OmniWeb/",
				identity: "OmniWeb"
			},
			{
				string: navigator.vendor,
				subString: "Apple",
				identity: "Safari",
				versionSearch: "Version"
			},
			{
				prop: window.opera,
				identity: "Opera",
				versionSearch: "Version"
			},
			{
				string: navigator.vendor,
				subString: "iCab",
				identity: "iCab"
			},
			{
				string: navigator.vendor,
				subString: "KDE",
				identity: "Konqueror"
			},
			{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},
			{
				string: navigator.vendor,
				subString: "Camino",
				identity: "Camino"
			},
			{		// for newer Netscapes (6+)
				string: navigator.userAgent,
				subString: "Netscape",
				identity: "Netscape"
			},
			{
				string: navigator.userAgent,
				subString: "MSIE",
				identity: "Explorer",
				versionSearch: "MSIE"
			},
			{
				string: navigator.userAgent,
				subString: "Gecko",
				identity: "Mozilla",
				versionSearch: "rv"
			},
			{ 		// for older Netscapes (4-)
				string: navigator.userAgent,
				subString: "Mozilla",
				identity: "Netscape",
				versionSearch: "Mozilla"
			}
		],
		dataOS : [
			{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
			},
			{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
			},
			{
				   string: navigator.userAgent,
				   subString: "iPhone",
				   identity: "iPhone/iPod"
		    },
			{
				string: navigator.platform,
				subString: "Linux",
				identity: "Linux"
			}
		]

	};
BrowserDetect.init();
return BrowserDetect;
}






var getGridChat = function(grid_id, grid_title, grid_store, grid_columns, grid_button_cfg,Lheight,Lwidth) {

var tbar = [];
if (grid_button_cfg.autofitGrid == undefined) grid_button_cfg.autofitGrid = true;
	if (grid_button_cfg.actionPos == undefined) grid_button_cfg.actionPos = "right";
	else grid_button_cfg.actionPos = "left";
	  
	
   // grid_columns.reverse();
     
	  /*
	   cameraHandler: cameraHandler,
			    videoHandler: videoHandler,
				lowHandler: lowHandler,
				highHandler: highHandler,
				sosHandler: sosHandler,		
				positionHandler:positionHandler,
				//icon-chat-incoming,icon-chat-outgoing,icon-chat-camera,icon-chat-video,icon-chat-sos
//icon-chat-position,icon-chat-low-perintah,icon-chat-high-perintah	
	   */
	
	if (grid_button_cfg.cameraHandler != undefined){
		    tbar.push({ 	    
		  	     iconCls: 'icon-chat-camera',
		  	     id: 'globalCreateButton1',
		  	     handler: grid_button_cfg.cameraHandler
		  	     
		  	 });
		    tbar.push(' &nbsp; ');
		    tbar.push(' ');
	}
	
	if (grid_button_cfg.videoHandler != undefined){
		    tbar.push({ 	    
		 	     iconCls: 'icon-chat-video',
		 	     id: 'globalCreateButton2',
		 	     handler: grid_button_cfg.videoHandler
		 	     
		 	 });
		    tbar.push(' &nbsp; ');
		    tbar.push(' ');
	}
	
    tbar.push({ 	    
	     iconCls: 'icon-chat-low-perintah',
	     id: 'globalCreateButton3',
	     handler: grid_button_cfg.lowHandler
	     
	 });
    tbar.push(' &nbsp; ');
    tbar.push(' ');
    tbar.push({ 	    
	     iconCls: 'icon-chat-high-perintah',
	     id: 'globalCreateButton4',
	     handler: grid_button_cfg.highHandler
	     
	 });
    
    tbar.push({ 	    
	     iconCls: 'icon-chat-sos',
	     id: 'globalCreateButton5',
	     handler: grid_button_cfg.sosHandler
	     
	 });
    tbar.push(' &nbsp; ');
    tbar.push(' ');
    tbar.push({ 	    
	     iconCls: 'icon-chat-position',
	     id: 'globalCreateButton6',
	     handler: grid_button_cfg.positionHandler
	     
	 });
    
   return new Ext.grid.GridPanel({     
          id: grid_id
         ,store: grid_store        
          
         
         ,columns: grid_columns
         ,width:Lwidth
         ,height:Lheight
         ,bbar: tbar
         ,enableColumnHide: false
         ,stripeRows: true
         ,trackMouseOver:false
         ,loadMask: true
        //,plugins: [update]
         ,selModel: new Ext.grid.RowSelectionModel({
            singleSelect: true
         })
        ,viewConfig: {
            forceFit: grid_button_cfg.autofitGrid
        }
        ,collapsible: false
    });

    
 }
 
