const Router = require('express');
const router = new Router();
const usersRouter = require('./users');
const BasketItemRouter = require('./basketItem')
const BasketRouter = require('./basket')
const ItemRouter = require('./item')

router.use("/user", usersRouter);
router.use("/basketitem", BasketItemRouter);
router.use("/basket", BasketRouter);
router.use("/item", ItemRouter);

module.exports = router;