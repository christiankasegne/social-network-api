const { User, Thought } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .lean()
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that id' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  updateUserById(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteUserById(req, res) {
    User.findOneAndRemove({ _id: req.params.userId }, { new: true })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that id' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    console.log('You are adding a friend.');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { new: true }
    )
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that id.' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friend: req.params.friendId } },
      { new: true }
    )
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that id.' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
