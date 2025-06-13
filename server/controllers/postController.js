const Post = require("../models/post.model");
const posts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const post = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const addPost = async (req, res) => {
  try {
    const { title, image, description, author } = req.body;

    const post = new Post({
      title,
      image,
      description,
      author,
    });
    await post.save();

    return res.status(201).json({ post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, description, author } = req.body;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, image, description, author },
      { new: true }
    );
    return res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  posts,
  post,
  addPost,
  deletePost,
  updatePost,
};