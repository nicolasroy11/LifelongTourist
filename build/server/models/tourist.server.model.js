var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');

var TouristSchema = new Schema(
{
	username: 
	{
		type: String,
		unique: true,
		trim: true,
		required: "Email is a required field!",
		match: [/.+\@.+\..+/, "Please fill a valid e-mail address!"]	// email regex
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
	primary:
	{
		gender :
		{
	        type: String,
	    },
		industry :
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

// RoomieSchema.methods is used to create a method that can be called on the mongoose RoomieSchema
// object. RoomieShema.statics is used to create Statics. Statics are pretty much the same as methods but 
// allow for defining functions that exist directly on your Model

// Before saving, we hash the password so it isn't sent to DB in clear text form.
TouristSchema.pre('save', function(next)
{
	if (this.password)
	{
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
		// this.id = 'ur' + this._id.toString();
	}
	next();
});

TouristSchema.methods.hashPassword = function(password)
{
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

// returns true if the input password matches the database password
TouristSchema.methods.authenticate = function(password)
{
	return this.password === this.hashPassword(password);
};

// This method is used to find an available unique username for new users
// Used for OAuth authentication.
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

// TouristSchema.plugin(passportLocalMongoose);

// This step actually creates a collection in the db.
var Tourist = mongoose.model("Tourist", TouristSchema);

module.exports = Tourist;