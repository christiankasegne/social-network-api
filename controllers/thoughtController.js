const { Thought, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that id' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created, but found no user with that id',
            })
          : res.json('Thought created')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId }, { new: true })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that id' })
          : Thought.deleteMany({ _id: { $in: thought.reactions } })
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res) {
    console.log('You are adding a reaction.');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .populate({ path: 'reactions', select: '-__v' })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that id.' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .populate({ path: 'reactions', select: '-__v' })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with that id.' })
          : Thought.deleteMany({ _id: { $in: thought.reactions } })
      )
      .then(() => res.json({ message: 'Reaction deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
};
