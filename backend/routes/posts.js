const router = require('express').Router();

const postsCtrl = require('../controllers/posts');
const multer = require('multer');
const upload = multer();

const { checkUser } = require('../middleware/authMiddleware');

router.post("/", checkUser, upload.single('file'), postsCtrl.createPost);
router.get("/:uuid", checkUser, postsCtrl.getOnePost);
router.get("/", checkUser, postsCtrl.getAllPosts);
router.put("/:uuid", checkUser, postsCtrl.modifyPost);
router.delete("/:uuid", checkUser, postsCtrl.deletePost);
router.post("/like-post/:uuid", checkUser, postsCtrl.likePost);
router.delete("/unlike-post/:uuid", checkUser, postsCtrl.unlikePost);

module.exports = router;