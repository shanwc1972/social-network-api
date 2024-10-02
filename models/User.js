const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the User schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address'] // Email format validation
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought' // Reference to the Thought model
    }
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Self-reference to the User model
    }
  ]
});

// Create a virtual property for friend count
userSchema.virtual('friendCount').get(function() {
  return this.friends.length; // Retrieve the length of the friends array
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;