const router = require('express').Router();

const usersCtrl = require('../controllers/users')

router.post("/", usersCtrl.createUser);
router.get("/:uuid", usersCtrl.getOneUser);
router.get("/", usersCtrl.getAllUsers);
router.put("/:uuid", usersCtrl.modifyUser);
router.delete("/:uuid", usersCtrl.deleteUser);
router.post("/follow/:uuid", usersCtrl.follow);

module.exports = router;