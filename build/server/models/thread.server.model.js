var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ThreadSchema = new Schema(
{
  	parties:
  	[{
  		type: Schema.ObjectId,
    	ref: 'Roomie'
  	}],
  	agent:
  	{
  		type: Schema.ObjectId,
    	ref: 'Roomie'
  	},
  	title:
  	{
  		type: String,
  		default: 'no title',
  	},
  	messages:
  	[{
  		created:
		{
	        type: Date,
	        default: Date.now
	    },
	    senderID:
	  	{
	  		type: Schema.ObjectId,
	    	ref: 'Roomie'
	  	},
	  	senderName:
	  	{
	  		type: String,
	  	},
  		status:
	 	{
	 		type: Number,
	 		default: '1',
	 	},
	 	message:
	 	{
	  		type: String,
	  		default: 'no content',
	  	},
  	}],

});


ThreadSchema.set('toJSON', {getters: true, virtuals: true});

// roomieSchema.plugin(passportLocalMongoose);

// This step actually creates a collection in the db.
var Thread = mongoose.model("Thread", ThreadSchema);

module.exports = Thread;