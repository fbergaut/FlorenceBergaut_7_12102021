const router = require('express').Router();

const uploadCtrl = require('../controllers/upload')
const multer = require('multer');
const upload = multer();

router.post("/upload", upload.single('file'), uploadCtrl.uploadImg)

module.exports = router;