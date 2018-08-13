
var initializeGeoJasonDisplay=function(gmap, type, callbackName){ 
    var imageUrl = 'http://chart.apis.google.com/chart?cht=mm&chs=24x32&chco=FFFFFF,008CFF,000000&ext=.png';
      
    gmap.data.setStyle(function(feature) {
         var markerTitle = feature.getProperty('name');
         var type = feature.getProperty('displayType');
         var imageUrl='';
         if (type == 'outlet'){
            imageUrl = '/ssnd/assets/img/icon_outlet.png';
         }else if (type == 'courier'){
            imageUrl = '/ssnd/assets/img/icon_courier.png';
         }else if (type == 'canvasser'){
            imageUrl = '/ssnd/assets/img/icon_canvasser.png';
         }
         var markerImage = new google.maps.MarkerImage(imageUrl,new google.maps.Size(32, 37));
         return {
            clickable:true,
            icon: markerImage,
            title: markerTitle
         };
      });
    
    // Set mouseover event for each feature.
      gmap.data.addListener('click', function(event) {
        var feature = event.feature;
        var latLng = feature.getGeometry().get();
        var clickFunction;
        if (type == 'daily'){
            clickFunction = '<tr height="32px"><td colspan="2"><a href="#" onClick="javascript:'+callbackName+'('+feature.getProperty('id')+',\''+feature.getProperty('name')+'\');" >Click to add route</a></td></tr>';
            console.log(clickFunction);
          }else if (type == 'weekly'){
            clickFunction = '<tr height="32px"><td colspan="2">Visit this on <select onChange="javascript:'+callbackName+'('+feature.getProperty('id')+',\''+feature.getProperty('name')+'\',value);"><option value="1">Monday</option><option value="2">Tuesday</option><option value="3">Wednesday</option><option value="4">Thursday</option><option value="5">Friday</option><option value="6">Saturday</option><option value="7">Sunday</option></select> </td></tr>';
            console.log(clickFunction);
        }
        
        var info2 = '<div class="row">'
  +  '<div class="col-md-6">'
  +    '<img src="'+feature.getProperty("image")+'" style="-webkit-border-radius: 50em; -moz-border-radius: 50em; border-radius: 50em;" width="100px" height="100px" >'
  +    '<div class="caption">'
  +      '<h5>'+feature.getProperty("name")+'</h5>'
  +   '</div>'
  +  '</div>'
  +   '<div class="col-md-2 col-md-4">'
  +   '<img src="/ssnd/assets/img/icon_phone.png" width="16px">'
  +   '<p>'+feature.getProperty("address")+'</p>'
  +  '</div>'
  +'</div>';
        
        var info = "<table width='240px'>"
      + "<tr><td colspan='2' style='text-align: center;'><h5>"+feature.getProperty('name')+"</h5></td></tr>"
      + "<tr><td colspan='2' align='center'><img src='"+feature.getProperty('image')+"' style='-webkit-border-radius: 50em; -moz-border-radius: 50em; border-radius: 50em;' width='100px' height='100px'></td></tr>"
      + "<tr height='32px'><td width='25px'><img src='/ssnd/assets/img/icon_phone.png' width='16px'></td><td style='padding-left:5px;'>"+feature.getProperty('phone')+"</td></tr>"
      + "<tr height='32px'><td width='25px'><img src='/ssnd/assets/img/icon_address.png' width='16px'></td><td style='padding-left:5px;'>"+feature.getProperty('address')+"</td></tr>"
      + clickFunction;
          + "</table>";
        var infowindow = new google.maps.InfoWindow({
               content: info,
            position: latLng,
            maxWidth: 250
        });
        infowindow.open(gmap);
      });
      
};