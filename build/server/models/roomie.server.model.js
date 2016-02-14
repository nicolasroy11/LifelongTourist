var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var RoomieSchema = new Schema(
{
	username: 
	{
		type: String,
		unique: true,
		trim: true,
		required: "Email is a required field!",
		match: [/.+\@.+\..+/, "Please fill a valid e-mail address!"]	
	},
  	password: 
  	{
  		type: String,
  		required: "Password is a required field!",
  	},
  	salt:
  	{
  		type: String
  	},
  	provider:
  	{
  		type: String,
  		required: 'Provider is required (local or OAuth)'
  	},
  	providerId: String,
  	providerData: {},
  	threads :
	[{
        type: Schema.ObjectId,
		ref: 'Thread'
    }],
	meta: 
	{
		created:
		{
	        type: Date,
	        default: Date.now
	    },
	    hasApplied :
		{
	        type: Number,
	        default: '0',
	    },
	    hasRoom :
		{
	        type: Schema.ObjectId,
    		ref: 'Room'
	    },
	 	status:
	 	{
	 		type: Number,
	 		default: '1',
	 	}
	},
	primary:
	{
		gender :
		{
	        type: String,
	    },
	    couple :
		{
	        type: String,
	        default: 'no',
	    },
	    age :
		{
	        type: Number,
	        default: 18,
	    },
	    hours :
		{
	        type: String,
	        default: 'none',
	    },
		industry :
		{
	        type: String,
	        default: 'none',
		},
		pets :
		{
	        type: String,
	        default: 'none',
		},
		smoking : 
		{
	        type: String,
	        default: 'no',
	    }
	},
	profile:
	{
		name:
		{
	        type: String,
	        default: 'name pending',
	    },
		hometown :
		{
	        type: String,
	        default: 'hometown pending',
	    },
		bio :
		{
	        type: String,
	        default: 'bio pending',
	    },

				photoURL :
		{
	        type: String,
	        default: 'upload pending',
	    }
	},
    match:
    {
    	couple :
		{
			value:
	        {
		        type: String,
	    	},
	        weight:
	        {
	        	type: Number,
	        	default: 1
	        }
	   	},
	   	gender :
		{
	        value:
	        {
		        type: String,
	    	},
	        weight:
	        {
	        	type: Number,
	        	default: 1
	        }
	   	},
	   	ageRange :
		{
			startAge :
			{
		        type: Number,
		        default: '18'
		   	},
		   	endAge :
			{
		        type: Number,
		        default: '120'
		   	},
		   	weight:
	        {
	        	type: Number,
	        	default: 1
	        }
	    },
	    hours :
		{
	        value:
	        {
		        type: String,
	    	},
	        weight:
	        {
	        	type: Number,
	        	default: 1
	        }
	    },
	    industry :
		{
	        value:
	        {
		        type: String,
	    	},
	        weight:
	        {
	        	type: Number,
	        	default: 1
	        }
	    },
	    pets :
		{
	        value:
	        {
		        type: String,
	    	},
	        weight:
	        {
	        	type: Number,
	        	default: 1
	        }
	    },
	    smoking :
		{
	        value:
	        {
		        type: String,
	    	},
	        weight:
	        {
	        	type: Number,
	        	default: 1
	        }
	    },

	        }
});


RoomieSchema.pre('save', function(next)
{
	if (this.password)
	{
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

RoomieSchema.methods.hashPassword = function(password)
{
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

RoomieSchema.methods.authenticate = function(password)
{
	return this.password === this.hashPassword(password);
};

RoomieSchema.statics.findUniqueUsername = function(username, suffix, callback)
{
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne(
	{
		username: possibleUsername
	},
	function(err, user)
	{
		if (!err)
		{
			if (!user)
			{
				callback(possibleUsername);
			}
			else
			{
				return this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		}
		else
		{
			callback(null);
		}
	});
};

RoomieSchema.set('toJSON', {getters: true, virtuals: true});


var Roomie = mongoose.model("Roomie", RoomieSchema);

module.exports = Roomie;