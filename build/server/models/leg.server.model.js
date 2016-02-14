var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LegSchema = new Schema(
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
});


var Leg = mongoose.model("Leg", LegSchema);
module.exports = Leg;