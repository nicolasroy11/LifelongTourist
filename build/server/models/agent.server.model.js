var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var AgentSchema = new Schema(
{
	username: 
	{
		type: String,
		unique: true,
		trim: true,
		required: "Email is a required field!",
		match: [/.+\@.+\..+/, "Please fill a valid e-mail address!"]	
	},
	agentNumber: 
	{
		type: String,
		unique: true,
		trim: true,
		required: "Agent number is a required field!",
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
	    hasRooms :
		[{
	        type: Schema.ObjectId,
    		ref: 'Room'
	    }],
	},
	profile:
	{
		name:
		{
	        type: String,
	        default: 'name pending',
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
});


AgentSchema.pre('save', function(next)
{
	if (this.password)
	{
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

AgentSchema.methods.hashPassword = function(password)
{
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

AgentSchema.methods.authenticate = function(password)
{
	return this.password === this.hashPassword(password);
};

AgentSchema.statics.findUniqueUsername = function(username, suffix, callback)
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

AgentSchema.set('toJSON', {getters: true, virtuals: true});


var Agent = mongoose.model("Agent", AgentSchema);

module.exports = Agent;