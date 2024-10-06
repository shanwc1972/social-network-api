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

    // Get a single user
    async getSingleUser(req, res) {
        try {
        const user = await User.findOne({ _id: req.params.userId })
            .populate('friends');

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        res.json(user);
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

    // Update a single user
    async updateSingleUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
        
            if (!user) {
                res.status(404).json({ message: 'No user with this id!' });
            }
        
            res.json(user);
            } catch (err) {
              res.status(500).json(err);
            }
    },

    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete(
                { _id: req.params.userId },
            );
        
            if (!user) {
                res.status(404).json({ message: 'No user with this id!' });
            }
        
            res.json({ message: 'User deleted' });
            } catch (err) {
              res.status(500).json(err);
            }
    },
  
  };