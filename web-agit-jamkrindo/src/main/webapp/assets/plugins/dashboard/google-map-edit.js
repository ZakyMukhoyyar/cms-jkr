	window.onload = loadScript;

	function loadScript() {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBbJ16uUP1tqA_-qsojvMCBV12V71rukHA&sensor=true&' +
			'callback=initialize';
		document.body.appendChild(script);
	}

	var geocoder, map, infoWnd;
	
	function initialize() {
		geocoder = new google.maps.Geocoder();

		var styles = [
			{
				"stylers": [
					{ "visibility": "on" }
				]
			},
			{
				"featureType": "landscape.natural",
					"stylers": [
						{ "visibility": "simplified" },
						{ "color": "#f0f0f0" }
					]
			},
			{
				"featureType": "water",
				"stylers": [
					{ "visibility": "simplified" },
					{ "color": "#C2E7F5" }
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry",
				"stylers": [
					{ "visibility": "simplified" },
					{ "color": "#ffffff" }
				]
			},
			{
				"featureType": "road.local",
				"elementType": "geometry.stroke",
				"stylers": [
					{ "visibility": "off" }
				]
			},
			{
				"featureType": "road.local",
				"elementType": "labels.icon",
				"stylers": [
					{ "visibility": "off" }
				]
			},
			{
				"elementType": "labels.text.fill",
				"stylers": [
					{ "visibility": "on" },
					{ "color": "#646464" }
				]
			},
			{
				"featureType": "road.local",
				"elementType": "geometry.fill",
				"stylers": [
					{ "visibility": "on" },
					{ "weight": 1 },
					{ "color": "#ffffff" }
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry.fill",
				"stylers": [
					{ "lightness": 90 },
					{ "color": "#d7d7d7" },
					{ "visibility": "off" }
				]
			},
			{
				"featureType": "transit",
				"elementType": "geometry",
				"stylers": [
					{ "visibility": "on" },
					{ "color": "#ffffff" }
				]
			},
			{
				"featureType": "road.local",
				"elementType": "labels.text.fill",
				"stylers": [
					{ "visibility": "on" },
					{ "color": "#b8b8b8" }
				]
			},
			{
				"featureType": "landscape.man_made",
				"elementType": "geometry",
				"stylers": [
					{ "visibility": "on" },
					{ "lightness": 60 },
					{ "saturation": -90 },
					{ "gamma": 0.90 }
				]
			}
		];
		
		var styledMap = new google.maps.StyledMapType(styles, {
			name: "Styled Map"
		});
			
		var mapOptions = {
			zoom: 13,
			scrollwheel: false,
			panControl: false,
			scaleControl: false,
			mapTypeControlOptions: {
				mapTypeIds: []
			}
		};
		
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
		
		codeAddress();
	}

	function codeAddress() {
	
		var address = "Jl. Imam Bonjol No.74, Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310, Indonesia";
		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var image = new google.maps.MarkerImage("/assets/img/location-pin.png", null, null, null, new google.maps.Size(32, 32));
				var beachMarker = new google.maps.Marker({
					map: map,
					icon: image,
					position: results[0].geometry.location,
					clickable : true
				});
				
				infoWnd = new google.maps.InfoWindow({
					content :  "Please change the checkbox below."
				});
				
				google.maps.event.addListener(beachMarker, "click", function() {
					infoWnd.setContent("<div class='heading'>PT Frisian Flag Indonesia &nbsp;&nbsp;</div> " + 
						"<i class='fa fa-user'></i> PIC : <em>Andi (085611234)</em> <br> " +
						"<i class='fa fa-calendar'></i> Last Visit : <em>12 Oct 2015</em> <br> " + 
						"<i class='fa fa-money'></i> Last Transaction : <em>Rp 5.460.000</em> <br><br> " + 
						"<button class='btn btn-primary' type='button'><i class='fa fa-check-circle'></i> Detail Info</button>");
					infoWnd.open(map, beachMarker);
				});

			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	}

