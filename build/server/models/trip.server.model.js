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

// Before saving, we hash the password so it isn't sent to DB in clear text form.
// TripSchema.pre('save', function(next)
// {
// 	this.id = 'or' + this._id.toString();
// 	next();
// });

// This step actually creates a collection in the db.
var Trip = mongoose.model("Trip", TripSchema);
module.exports = Trip;