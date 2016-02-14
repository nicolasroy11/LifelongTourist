angular.module('app').factory('MatchSvc',[function()
{
	return function(current, kandidat)	// current is the logged in user, kandidat is the potential roomie under test
	{
		var cp = current.primary;
		var cm = current.match;
		var kp = kandidat.primary;
		var km = kandidat.match;
		var cpkm_tally;	// Unilateral coefficient of current's primary against kandidat's match criteria
		var kpcm_tally;	// Unilateral coefficient of kandidat's primary against current's match criteria
		var c_total;	// Tally of current's match total
		var k_total;	// Tally of kandidat's match total
		var debug = false;

		// Log the names of the matchees
		if (debug) console.log("current: " + current.profile.name + "  Kandidat: " + kandidat.profile.name);

		var matchTotal = function(s)
		{
			var total = 0;
			for (var key in s)
			{
				if (s.hasOwnProperty(key))	// iterate through cm or km's fields and add up their weights
				{
					if (debug) console.log( key + ": " + s[key].weight );
					total += s[key].weight;
				}
			  
			}
			if (debug) console.log(s + " total: " + total);
			return total
		}

		var matchDenum = function(s, t)	// s is the primary, t the matcher.
		{
			// First, get the names of s and t and assign them for debugging
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
			for (var key in t)	// Cycle through the match (current's or Kandidat's) fields
			{
				if (t.hasOwnProperty(key))	// iterate through cm or km's fields and add up their weights
				{
					// Age is handled differently than the other fields
					if(key === 'ageRange')
					{
						if (debug) console.log('Age range: start age: ' + t[key].startAge);
						if (debug) console.log('Age range: end age: ' + t[key].endAge);
						if (debug) console.log('Age under test: ' + s['age']);
						if( s['age'] > t[key].endAge || s['age'] < t[key].startAge )
						{
							if (debug) console.log('Sorry, age is no match.');
							if (t[key].weight === 3)	// If the weight was a deal breaker, the match is null
							{
								if (debug) console.log('Disqualified!');
								return 0;
							}
							else if (t[key].weight === 1)
							{
								total += 1;
								if (debug) console.log('points earned via dc: 1');
							}
							else
							{
								if (debug) console.log('no points earned');
							}
						}
						else
						{
							if (debug) console.log('Age is good!');
							if (debug) console.log('points earned: ' + t[key].weight);
							total += t[key].weight;
						}
					}
					// All other match fields
					else
					{
						if (debug) console.log( tName + '\'s preference: ' + key + ": " + t[key].value );
						if (debug) console.log( sName + '\'s primary: ' + key + ": " + s[key] );
						if(t[key].value === s[key])	// If the match and primary agree, add the field's weight to the tally
						{
							if (debug) console.log('points earned: ' + t[key].weight);
							total += t[key].weight;
						}
						// If there is a mismatch
						else
						{
							if (t[key].weight === 3)	// If the weight was a deal breaker, the match is null
							{
								if (debug) console.log('Disqualified!');
								return 0;
							}
							else if (t[key].weight === 1)
							{
								total += 1;
								if (debug) console.log('points earned via dc: 1');
							}
							else
							{
								if (debug) console.log('no points earned');
							}
						}
					}
				}
			}
			if (debug) console.log("total: " + total);
			return total
		}
		
		cpkm_tally = matchDenum(cp, km);
		kpcm_tally = cpkm_tally === 0 ? 0 : matchDenum(kp, cm);	// If cpkm_tally is zero, don't bother calculating kpcm; just set it to 0.
		c_total = matchTotal(cm);
		k_total = matchTotal(km);
		
		var comp = Math.round((kpcm_tally * cpkm_tally) / (c_total * k_total) * 100);
		return comp;
	}
}]);