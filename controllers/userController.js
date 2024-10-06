const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
      try {
        const users = await User.find();
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
            .populate('friends')
            .populate('thoughts');

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

             //Delete assocated thoughts associated with the user's username 
             await Thought.deleteMany(
                { username : user.username }
            );
        
            res.json({ message: 'User and associated thoughts deleted' });
            } catch (err) {
              res.status(500).json(err);
            }
    },

    //Create a friend for a user
    async createFriend(req, res) {
        try {
            const { userId, friendId } = req.params;

            const user = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { friends: friendId } }, // Add friendId to friends array
                { new: true } // Return the updated user document
            );
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Delete a friend from a user
    async deleteFriend(req, res) {
        try {
            const { userId, friendId } = req.params;

            const user = await User.findByIdAndUpdate(
                userId,
                { $pull: { friends: friendId } }, // Remove friendId from friends array
                { new: true } // Return the updated user document
            );
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
  };