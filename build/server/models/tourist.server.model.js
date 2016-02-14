var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var TouristSchema = new Schema(
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
	trips :
	[{
        type: Schema.ObjectId,
		ref: 'Trip'
    }],
    threads :
	[{
        type: Schema.ObjectId,
		ref: 'Thread'
    }],
  	providerId: String,
  	providerData: {},

  		meta: 
	{
		created:
		{
	        type: Date,
	        default: Date.now
	    },
	},
	profile:
	{
		name :
		{
	        type: String,
	    },
		gender :
		{
	        type: String,
	    },
		occupation :
		{
	        type: String,
	        default: 'none',
		},
		hometown :
		{
	        type: String,
	        default: 'none',
		},
		bio :
		{
	        type: String,
	        default: 'none',
		},
	},
	fellow:
	{
		type: Schema.ObjectId,
    	ref: 'Tourist'
	}
});

TouristSchema.pre('save', function(next)
{
	if (this.password)
	{
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

TouristSchema.methods.hashPassword = function(password)
{
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

TouristSchema.methods.authenticate = function(password)
{
	return this.password === this.hashPassword(password);
};

TouristSchema.statics.findUniqueUsername = function(username, suffix, callback)
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

TouristSchema.set('toJSON', {getters: true, virtuals: true});


var Tourist = mongoose.model("Tourist", TouristSchema);

module.exports = Tourist;