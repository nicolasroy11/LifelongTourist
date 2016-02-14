angular.module('app').factory('MatchSvc',[function()
{
	return function(current, kandidat)	
	{
		var cp = current.primary;
		var cm = current.match;
		var kp = kandidat.primary;
		var km = kandidat.match;
		var cpkm_tally;	
		var kpcm_tally;	
		var c_total;	
		var k_total;	
		var debug = false;

		if (debug) void 0;

		var matchTotal = function(s)
		{
			var total = 0;
			for (var key in s)
			{
				if (s.hasOwnProperty(key))	
				{
					if (debug) void 0;
					total += s[key].weight;
				}

			  			}
			if (debug) void 0;
			return total
		}

		var matchDenum = function(s, t)	
		{
			var tName;
			var sName;
			(function()
			{
				if (s === cp)
				{
					tName = kandidat.profile.name;
					sName = current.profile.name;
				}
				else
				{
					tName = current.profile.name;
					sName = kandidat.profile.name;
				}
			}())

			var total = 0;
			for (var key in t)	
			{
				if (t.hasOwnProperty(key))	
				{
					if(key === 'ageRange')
					{
						if (debug) void 0;
						if (debug) void 0;
						if (debug) void 0;
						if( s['age'] > t[key].endAge || s['age'] < t[key].startAge )
						{
							if (debug) void 0;
							if (t[key].weight === 3)	
							{
								if (debug) void 0;
								return 0;
							}
							else if (t[key].weight === 1)
							{
								total += 1;
								if (debug) void 0;
							}
							else
							{
								if (debug) void 0;
							}
						}
						else
						{
							if (debug) void 0;
							if (debug) void 0;
							total += t[key].weight;
						}
					}
					else
					{
						if (debug) void 0;
						if (debug) void 0;
						if(t[key].value === s[key])	
						{
							if (debug) void 0;
							total += t[key].weight;
						}
						else
						{
							if (t[key].weight === 3)	
							{
								if (debug) void 0;
								return 0;
							}
							else if (t[key].weight === 1)
							{
								total += 1;
								if (debug) void 0;
							}
							else
							{
								if (debug) void 0;
							}
						}
					}
				}
			}
			if (debug) void 0;
			return total
		}

				cpkm_tally = matchDenum(cp, km);
		kpcm_tally = cpkm_tally === 0 ? 0 : matchDenum(kp, cm);	
		c_total = matchTotal(cm);
		k_total = matchTotal(km);

				var comp = Math.round((kpcm_tally * cpkm_tally) / (c_total * k_total) * 100);
		return comp;
	}
}]);