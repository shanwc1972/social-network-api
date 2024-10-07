const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateSingleUser,
    deleteUser,
    createFriend,
    deleteFriend
  } = require('../../controllers/userController');

// /api/users GET and POST
router.route('/').get(getUsers).post(createUser);

// /api/users/:userid GET
router.route('/:userId').get((req, res) => {
    console.log("Single User Route Get Requested");
    getSingleUser(req, res);
});

// /api/users/:userid PUT
router.route('/:userId').put((req, res) => {
    console.log("Single User Route Update Requested");
    updateSingleUser(req, res);
});

// /api/users/:userid DELETE
router.route('/:userId').delete((req, res) => {
    console.log("Single User Route Delete Requested");
    deleteUser(req, res);
});

// /api/users/:userId/friends/:friendId POST
router.route('/:userId/friends/:friendId').post((req, res) => {
    console.log("Create Friend for User route requested");
    createFriend(req, res);
});

// /api/users/:userId/friends/:friendId DELETE
router.route('/:userId/friends/:friendId').delete((req, res) => {
    console.log("Delete Friend from User route requested");
    deleteFriend(req, res);
});

module.exports = router;