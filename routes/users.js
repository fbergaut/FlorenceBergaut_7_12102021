const router = require('express').Router();

const usersCtrl = require('../controllers/users')

router.post("/users", usersCtrl.createUser);
router.get("/users/:uuid", usersCtrl.getOneUser);
router.get("/users", usersCtrl.getAllUsers);
router.put("/users/:uuid", usersCtrl.modifyUser);
router.delete("/users/:uuid", usersCtrl.deleteUser);

module.exports = router;