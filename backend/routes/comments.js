const router = require('express').Router();

const commentsCtrl = require('../controllers/comments');

const { checkUser } = require('../middleware/authMiddleware');

router.post("/", checkUser, commentsCtrl.createComment);
router.get("/:uuid", checkUser, commentsCtrl.getOneComment);
router.get("/", checkUser, commentsCtrl.getAllComments);
router.put("/:uuid", checkUser, commentsCtrl.modifyComment);
router.delete("/:uuid", checkUser, commentsCtrl.deleteComment);

module.exports = router;