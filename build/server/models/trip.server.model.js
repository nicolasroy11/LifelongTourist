var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TripSchema = new Schema(
{
	Tourists:
    [{
    	type: Schema.ObjectId,
    	ref: 'Tourist'
    }],
    fromDate:
	{
        type: Date
    },
    toDate:
	{
        type: Date
    },
    desc:
    {
    	type: String
    },
	destinations: 
	[{
	    city:
		{
	        type: String,
	    },
	    country:
		{
	        type: String,
	    },
	    desc:
	    {
	    	type: String
	    }
	}],
});


var Trip = mongoose.model("Trip", TripSchema);
module.exports = Trip;