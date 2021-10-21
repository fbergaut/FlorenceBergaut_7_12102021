const router = require('express').Router();

const postsCtrl = require('../controllers/posts')

router.post("/posts", postsCtrl.createPost);
router.get("/posts/:uuid", postsCtrl.getOnePost);
router.get("/posts", postsCtrl.getAllPosts);
router.put("/posts/:uuid", postsCtrl.modifyPost);
router.delete("/posts/:uuid", postsCtrl.deletePost);

module.exports = router;