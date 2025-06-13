const { register, login, getUser,logout } = require("../controllers/authController");
const cors = require("cors");
const { checkAuth } = require("../middlewares/userAuth");

const router = require("express").Router();
router.use(
  cors({
    origin: "https://cms-uuv8.onrender.com",
    credentials: true,
  })
);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkAuth", checkAuth, getUser);

module.exports = router;
