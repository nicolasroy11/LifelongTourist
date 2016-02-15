var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TripSchema = new Schema(
{
	lister:
    {
    	type: Schema.ObjectId,
    	ref: 'Tourist'
    },
	tourists:
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
    title:
    {
        type: String
    },
    desc:
    {
    	type: String
    },
	legs: 
	[{
    	type: Schema.ObjectId,
    	ref: 'Leg'
    }],
    tags:
    [{
        type: String
    }],
});


var Trip = mongoose.model("Trip", TripSchema);
module.exports = Trip;