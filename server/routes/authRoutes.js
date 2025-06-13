const { register, login, getUser,logout } = require("../controllers/authController");
const cors = require("cors");
const { checkAuth } = require("../middlewares/userAuth");

const router = require("express").Router();
router.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkAuth", checkAuth, getUser);

module.exports = router;
