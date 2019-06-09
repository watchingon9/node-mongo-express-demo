const router = require('express').Router();
const Post = require('../models/Post');

// Retrieve all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Submit a post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });

  try {
    const savePost = await post.save();
    res.status(200).send({ id: savePost._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get a post by id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.send(post);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a post by id
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.remove({ _id: req.params.id });
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update a post
router.patch('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          date: Date.now()
        }
      }
    );
    res.send(updatedPost);
  } catch (err) {
    err.status(400).send(err);
  }
});

module.exports = router;
