const { Router } = require("express");
const { expressjwt: jwt } = require("express-jwt");
const tripsController = require("../controllers/trips");

const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
  algorithms: ["HS256"],
});

const router = Router();
router
  .get("/", tripsController.tripsList)
  .post("/", auth, tripsController.tripsAddTrip);

router
  .get("/:tripCode", tripsController.tripsFindByCode)
  .put("/:tripCode", auth, tripsController.tripsUpdateTrip)
  .delete("/:tripCode", auth, tripsController.tripsDeleteTrip);

module.exports = router;
