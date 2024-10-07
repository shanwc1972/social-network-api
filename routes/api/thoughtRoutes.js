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

// /api/thoughts GET and POST
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtid GET
router.route('/:thoughtId').get((req, res) => {
    console.log("Single GET Thought Route Requested");
    getSingleThought(req, res);
});

  // /api/thoughts/:thoughtid PUT
router.route('/:thoughtId').put((req, res) => {
    console.log("PUT Thought Route Requested");
    updateThought(req, res);
});

  // /api/thoughts/:thoughtid DELETE
router.route('/:thoughtId').delete((req, res) => {
    console.log("Delete Thought Route Requested");
    deleteThought(req, res);
});

// /api/thoughts/:thoughtId/reactions POST
router.route('/:thoughtId/reactions').post((req, res) => {
    console.log("Create Reaction Route Requested");
    createReaction(req, res);
});

// /api/thoughts/:thoughtId/reactions/:reactionId DELETE
router.route('/:thoughtId/reactions/:reactionId').delete((req, res) => {
    console.log("Delete Reaction Route Requested");
    deleteReaction(req, res);
}); 

module.exports = router;