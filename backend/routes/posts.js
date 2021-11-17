const router = require('express').Router();

const postsCtrl = require('../controllers/posts');

const { checkUser } = require('../middleware/authMiddleware');

router.post("/", checkUser, postsCtrl.createPost);
router.get("/:uuid", checkUser, postsCtrl.getOnePost);
router.get("/", checkUser, postsCtrl.getAllPosts);
router.put("/:uuid", checkUser, postsCtrl.modifyPost);
router.delete("/:uuid", checkUser, postsCtrl.deletePost);

module.exports = router;