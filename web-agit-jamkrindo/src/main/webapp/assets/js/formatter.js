var YesNoFormatter = function(data, type, row){
    var icon = (data == true || data == 'Y') ? '<i class="fa fa-check-square-o" style="color:green; "></i>':'<i class="fa fa-square-o" ></i>';
    return icon;
};

var LookupFlagFormatter = function(data, type, row){
    var value = "";
    if (row.activeFlag == 'Y') {
    	
    	value = '<span class="label label-status label-info"> Active </span>';
    }else if (row.activeFlag == 'N'){
    	
    	value = '<span class="label label-status label-warning"> Inactive </span>';
    }
    
    return value;
};	

var StatusFormatter = function(data, type, row){
    var value = "";
    if (row.enabled == 1 ) {
    	value = '<span class="label label-status label-info"> Active </span>';
    }else{
    	value = '<span class="label label-status label-warning"> Inactive </span>';
    }
    return value;
};	

var CompanyTypeFormatter = function(data, type, row){
    var value = "";
    if (row.type == 'PT') {
    	
    	value = '<span class="label label-status label-success"> PT </span>';
    }else if (row.type == 'OTHER'){
    	
    	value = '<span class="label label-status label-warning"> OTHER </span>';
		
    }else if (row.type == 'CV'){
    	
    	value = '<span class="label label-status label-danger"> CV </span>';
    }
    
    return value;
};	

var ImeiStatusFormatter = function(data, type, row){
    var value = "";
    if (row.status == 'ACTIVE') {
    	
    	value = '<span class="label label-status label-success"> Active </span>';
    }else if (row.status == 'INACTIVE'){
    	
    	value = '<span class="label label-status label-warning"> Inactive </span>';
		
    }else if (row.status == 'SPARE'){
    	
    	value = '<span class="label label-status label-danger"> Spare </span>';
    }
    
    return value;
};	

var AccountStatusFormatter = function(data, type, row){
    var value = "";
    if (row.status == 'ACTIVE') {
    	
    	value = '<span class="label label-status label-success"> Active </span>';
    }else if (row.status == 'INACTIVE'){
    	
    	value = '<span class="label label-status label-warning"> Inactive </span>';
    }
    
    return value;
};	

var NewsStatusFormatter = function(data, type, row){
    var value = "";
    if (row.status == 'PUBLISHED') {
    	
    	value = '<span class="label label-status label-success"> PUBLISHED </span>';
    }else if (row.status == 'UNPUBLISHED'){
    	
    	value = '<span class="label label-status label-warning"> UNPUBLISHED </span>';
    }
    
    return value;
};	

var SubsStatusFormatter = function(data, type, row){
    var value = "";
    if (row.status == 'ACTIVE') {
    	
    	value = '<span class="label label-status label-success"> Active </span>';
    }else if (row.status == 'INACTIVE'){
    	
    	value = '<span class="label label-status label-warning"> Inactive </span>';
    }
    
    return value;
};	


var UserTypeFormatter = function(data, type, row){
    var value = "";
    if (row.usrType == 'COMP_ADMIN') {
    	
    	value = '<span class="label label-status label-success"> Company Admin </span>';
    }else if (row.usrType == 'SUPER_ADMIN'){
    	
    	value = '<span class="label label-status label-default"> Super Admin </span>';
    }
    
    return value;
};	

var BatchStatusFormatter = function(data, type, row){
    var value = "";
    if (row.status == 'SUCCESS') {
    	
    	value = '<span class="label label-status label-success"> SUCCESS </span>';
    }else if (row.status == 'PROCESSING'){
    	
    	value = '<span class="label label-status label-warning"> PROCESSING </span>';
		
    }else if (row.status == 'ERROR'){
    	
    	value = '<span class="label label-status label-danger"> ERROR </span>';
    }
    
    return value;
};	





