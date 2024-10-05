const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
      try {
        const users = await User.find();
        //const userObj = users.map(user => ({
        //  username: user.username,
        //  email: user.email,
        //  friendCount: user.friendCount,
        //}));
        return res.json(users);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

    // create a new user
    async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  };