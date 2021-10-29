const router = require('express').Router();

const postsCtrl = require('../controllers/posts')

router.post("/", postsCtrl.createPost);
router.get("/:uuid", postsCtrl.getOnePost);
router.get("/", postsCtrl.getAllPosts);
router.put("/:uuid", postsCtrl.modifyPost);
router.delete("/:uuid", postsCtrl.deletePost);

module.exports = router;