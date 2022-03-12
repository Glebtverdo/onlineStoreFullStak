const Router = require('express');
const router = new Router();
const controller = require("./controllers/userController");


router.post("/registraton", controller.registraton);
router.post("/login", controller.login);
router.post("/delet", controller.delet);
router.get("/check", controller.check);

module.exports = router;