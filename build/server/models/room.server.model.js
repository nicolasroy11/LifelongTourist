var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var roomSchema = new Schema(
{
	id:
	{
		type: String
	},
	streetAddress:
	{
		type: String
	},
	city:
	{
		type: String
	},
	neighborhood:
	{
		type: String
	},
	zip:
	{
		type: String
	},
	meta: 
	{
		created:
		{
	        type: Date,
	        default: Date.now
	    },
	    listerID:
		{
	        type: Schema.ObjectId,
    		ref: 'Roomie'
	    },
	    byAgent:
		{
	        type: Boolean,
	        default: false,
	    }
	},
	rooms :
    [{
    	price :
		{
	        type: Number,
	    },
	    price :
		{
	        type: Number,
	    },
    }],
	inclusions :
	{
		hotWater :
		{
	        type: Boolean,
	        default: false,
	    },
	    electricity :
		{
	        type: Boolean,
	        default: false,
	    },
	    laundry :
		{
	        type: Boolean,
	        default: false,
	    },
	    elevator :
		{
	        type: Boolean,
	        default: false,
	    },
		backyard :
		{
	        type: Boolean,
	        default: false,
		},
		rooftop :
		{
	        type: Boolean,
	        default: false,
		},
		balcony : 
		{
	        type: Boolean,
	        default: false,
	    },
	    privEntrance : 
		{
	        type: Boolean,
	        default: false,
	    },
	    parking : 
		{
	        type: Boolean,
	        default: false,
	    },
	    gym : 
		{
	        type: Boolean,
	        default: false,
	    },
	    desk : 
		{
	        type: Boolean,
	        default: false,
	    },
	    handicapAcc : 
		{
	        type: Boolean,
	        default: false,
	    }
	},
	profile:
	{
		listingName:
		{
	        type: String,
	    },
	    neighborhood:
		{
	        type: String,
	    },
		about :
		{
	        type: String,
	        default: 'no description',
	    },
	    numOfRooms :
		{
	        type: Number,
	    },
	    numOfRoommates :
		{
	        type: Number,
	    }
	},
    match :
    {
    	stuff :
		{
	        type: String,
	   	},
	   	securityDep :
		{
	        type: String,
	   	},
    },
    roomie :
    [{
    	type: Schema.ObjectId,
    	ref: 'Roomie'
    }]
});

roomSchema.pre('save', function(next)
{
	this.id = 'or' + this._id.toString();
	next();
});

var Room = mongoose.model("Room", roomSchema);
module.exports = Room;