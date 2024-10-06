const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateSingleUser,
    deleteUser
  } = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userid
router.route('/:userId').get((req, res) => {
    console.log("Single User Route Get Requested");
    getSingleUser(req, res);
});

router.route('/:userId').put((req, res) => {
    console.log("Single User Route Update Requested");
    updateSingleUser(req, res);
});

router.route('/:userId').delete((req, res) => {
    console.log("Single User Route Delete Requested");
    deleteUser(req, res);
});

module.exports = router;