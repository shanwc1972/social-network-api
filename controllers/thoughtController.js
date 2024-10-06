const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const { thoughtId } = req.params;
      
      const thought = await Thought.findOne({ _id: thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
  },

  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      
      //Update the assocaited user's thought array
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought.id } }, // Add thoughtId to thought array
        { new: true }
    );
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
    
        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
        }
    
        res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
        const thought = await Thought.findOneAndDelete(
            { _id: req.params.thoughtId },
            { runValidators: true, new: true }
        );

        //Remove the deleted thought from the user's thought arrray
        const user = await User.findOneAndUpdate(
          { username: req.body.username },
          { $pull: { thoughts: req.params.thoughtId } }, // Remove thoughtId from thought array
          { new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
        }
    
        res.json({ message: 'Thought deleted' });
        } catch (err) {
          res.status(500).json(err);
        }
  },

  //Create a reaction for a thought
  async createReaction(req, res) {
    try {
      const { thoughtId } = req.params;

      const thought = await Thought.findByIdAndUpdate(
          thoughtId,
          { $addToSet: { reactions: req.body } }, // Add new reaction to the thoughts array
          { new: true, runValidators: true } // Return the updated user document
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Delete a reaction from a thought
  async deleteReaction(req, res) {
    try {
      const { thoughtId, reactionId } = req.params;

      const thought = await Thought.findByIdAndUpdate(
          thoughtId,
          { $pull: { reactions: { _id: reactionId } } }, // Remove reactionId from reactions array
          { new: true } // Return the updated user document
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this ID' });
      }

      res.json({ message: 'Reaction deleted successfully', thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },
}