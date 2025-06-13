const { posts, post, addPost, updatePost, deletePost } = require("../controllers/postController");
const { checkAuth } = require("../middlewares/userAuth");

const router = require("express").Router();

router.get("/posts", posts);
router.get("/post/:id", post);
router.post("/post", addPost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

module.exports = router;