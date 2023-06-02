const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');


router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUserById).delete(deleteUserById);

router.route('/:userId/friends').post(addFriend);
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;