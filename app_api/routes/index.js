const { Router } = require("express");
const tripsRouter = require("./trips");
const authController = require("../controllers/authentication");



const router = Router();
router.use("/trips", tripsRouter);

router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
