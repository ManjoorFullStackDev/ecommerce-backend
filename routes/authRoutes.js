const authControllers = require("../controllers/authControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/admin-login", authControllers.admin_login);
router.get("/get-user", authMiddleware("get"), authControllers.getUser);
router.post("/post-user", authMiddleware("post"), authControllers.postUser);
router.get(
  "/get-user-by-id/:id",
  authMiddleware("get"),
  authControllers.getUserById,
);
router.get(
  "/search-location/:location",
  authMiddleware("get"),
  authControllers.searchLocations,
);
router.get("/get-skills", authMiddleware("get"), authControllers.getSkills);
router.get(
  "/get-all-users",
  authMiddleware("get"),
  authControllers.getAllUsers,
);
router.delete(
  "/delete-user/:id",
  authMiddleware("delete"),
  authControllers.deleteUser,
);
router.put("/update-user", authMiddleware("put"), authControllers.updateUser);
router.post("/register-user", authControllers.registerUser);
module.exports = router;
