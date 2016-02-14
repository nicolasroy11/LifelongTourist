angular.module('roomem').factory('roomSearchSvc',['QuerySvc', 'MatchSvc', function(QuerySvc, MatchSvc)
{
	this.searchLocations = function(query)
	{
		void 0;
		void 0;
		$http.get('/roomSearch/' + query)
		.success(function(rooms)
		{
			void 0;

			this.hasResults = true;
			this.roomList = rooms;

			for (i in rooms)
			{
				this.roomList[i].names = [];
				if (rooms[i].meta.byAgent === false){ this.roomList[i].names.push(rooms[i].meta.listerID.profile.name); }
				for(j = 0; j < rooms[i].roomie.length; j++)
				{
					this.roomList[i].names.push(rooms[i].roomie[j].profile.name); 
				}
				this.roomList[i].hash = "#/roomProfile/" + rooms[i]._id;
				void 0;
				if($sessionStorage.session)	
				{
					var match = MatchSvc(current, rooms[i].meta.listerID);
					$scope.roomList[i].compatibility = match;
					void 0;
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