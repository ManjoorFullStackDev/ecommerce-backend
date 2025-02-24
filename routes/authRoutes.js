const authControllers = require("../controllers/authControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = require('express').Router();

router.post('/admin-login', authControllers.admin_login)
router.get('/get-user',authMiddleware, authControllers.getUser)
router.post('/post-user', authControllers.postUser)
router.get('/get-user-by-id/:id', authControllers.getUserById)
router.get('/search-location/:location', authControllers.searchLocations)
router.get('/get-skills', authControllers.getSkills)
router.get('/get-all-users', authControllers.getAllUsers)
router.delete('/delete-user/:id',authMiddleware, authControllers.deleteUser)
router.put('/update-user', authControllers.updateUser)
module.exports = router;