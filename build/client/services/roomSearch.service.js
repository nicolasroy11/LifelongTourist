angular.module('app').factory('roomSearchSvc',['QuerySvc', 'MatchSvc', function(QuerySvc, MatchSvc)
{
	this.searchLocations = function(query)
	{
		console.log('In searchLocations');
		// var id = sessionStorage.getItem('userID');
	  	// s = $scope.search
		console.log('query: ' + query);
		$http.get('/roomSearch/' + query)
		.success(function(rooms)
		{
			console.log("roomSearch: " + JSON.stringify(rooms));

			this.hasResults = true;
			this.roomList = rooms;
			// Using jQuery to map the JSON results to a JS array
			// var room = $.map(rooms, function(el) { return el });

			// Compatibility algorithm here - loop through all rooms returned by the search
			for (i in rooms)
			{
				// display the names of each roomie in the view
				this.roomList[i].names = [];
				if (rooms[i].meta.byAgent === false){ this.roomList[i].names.push(rooms[i].meta.listerID.profile.name); }
				// console.log('rooms.length: ' + rooms.length);
				// console.log('rooms[i].roomie.length: ' + rooms[i].roomie.length);
				for(j = 0; j < rooms[i].roomie.length; j++)
				{
					this.roomList[i].names.push(rooms[i].roomie[j].profile.name); 
				}
				this.roomList[i].hash = "#/roomProfile/" + rooms[i]._id;
				console.log('this.roomList[i].names: ' + JSON.stringify(this.roomList[i].names));
				// console.log("$scope.name: " + $scope.name);
				// Calculate the compatibility index for the lister and the logged in user
				if($sessionStorage.session)	// Only test compatibility if someone is logged in
				{
					var match = MatchSvc(current, rooms[i].meta.listerID);
					$scope.roomList[i].compatibility = match;
					console.log("match is: " + match);
					if(match >= 80){this.roomList[i].compColor="#55aa55";}else
					if(match < 80 && match > 59){this.roomList[i].compColor="#dddd00";}else
					if(match < 60){this.roomList[i].compColor="#aa5555";}
				}
				else
				{
					this.roomList[i].compColor="#777";
					this.roomList[i].compatibility = 'log in!';
				}
			}
		});
	}
	return this;
}]);