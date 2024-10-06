const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
  } = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtid get
router.route('/:thoughtId').get((req, res) => {
    console.log("Single GET Thought Route Requested");
    getSingleThought(req, res);
});

  // /api/thoughts/:thoughtid put
router.route('/:thoughtId').put((req, res) => {
    console.log("PUT Thought Route Requested");
    updateThought(req, res);
});

  // /api/thoughts/:thoughtid delete
router.route('/:thoughtId').delete((req, res) => {
    console.log("Delete Thought Route Requested");
    deleteThought(req, res);
});

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post((req, res) => {
    console.log("Create Reaction Route Requested");
    createReaction(req, res);
});

router.route('/:thoughtId/reactions/:reactionId').delete((req, res) => {
    console.log("Delete Reaction Route Requested");
    deleteReaction(req, res);
}); 

module.exports = router;