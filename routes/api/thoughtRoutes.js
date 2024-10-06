const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
  } = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtid
router.route('/:thoughtId').get((req, res) => {
    console.log("Single Thought Route Requested!");
    getSingleThought(req, res);
  });

module.exports = router;