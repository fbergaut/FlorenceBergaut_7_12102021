const router = require('express').Router();

const authCtrl = require('../controllers/auth')

router.post("/register", authCtrl.signUp);
router.post("/login", authCtrl.signIn);
router.get("/logout", authCtrl.logOut);

module.exports = router;