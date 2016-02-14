app.controller("mapController", function($scope, uiGmapGoogleMapApi) {
  
  // Define variables for our Map object
  var areaLat      = 40.1451,
      areaLng      = -99.6680,
      areaZoom     = 7;

  uiGmapGoogleMapApi.then(function(maps) {
    $scope.map     = { center: { latitude: areaLat, longitude: areaLng }, zoom: areaZoom };
    $scope.options = { scrollwheel: false };
    var markers = [];
    markers.push(
    			{
    				latitude:40.1451,
    				longitude: -99.6680,
    				id:'0',
    				icon:'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m1.png'
    			});
    markers.push(
    			{
    				latitude:44.1451,
    				longitude: -90.6680,
    				id:'1',
    				icon:'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m2.png'
    			});
    $scope.hoodMarkers = markers;
    // $scope.marker = {
				// 	   id: 0,
				// 	   coords: 
				// 	   {
				// 			latitude: 40.1451,
				// 			longitude: -99.6680
				// 	   }
  		// 			}
  		 		});
});