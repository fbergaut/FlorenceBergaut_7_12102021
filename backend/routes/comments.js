const router = require('express').Router();

const commentsCtrl = require('../controllers/comments')

router.post("/", commentsCtrl.createComment);
router.get("/:uuid", commentsCtrl.getOneComment);
router.get("/", commentsCtrl.getAllComments);
router.put("/:uuid", commentsCtrl.modifyComment);
router.delete("/:uuid", commentsCtrl.deleteComment);

module.exports = router;