const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Reaction schema
const reactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280 // Ensuring the reaction body is between 1 and 280 characters
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function(createdAt) {
      return createdAt.toLocaleDateString('en-AU', { 
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      }); // Formatting the timestamp on query
    }
  }
}, {
  toJSON: {
    getters: true // Enables the getter for the createdAt field when converting to JSON
  }
});

// Define the Thought schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280 // Ensuring the thought text is between 1 and 280 characters
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function(createdAt) {
      return createdAt.toLocaleDateString('en-AU', { 
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      }); // Formatting the timestamp on query
    }
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema] // Array of nested documents using the reactionSchema
}, {
  toJSON: {
    virtuals: true, // Enables virtuals when converting to JSON
    getters: true // Enables getters for all fields when converting to JSON
  }
});

// Create a virtual property for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length; // Retrieve the length of the reactions array
});

// Create the Thought model
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;