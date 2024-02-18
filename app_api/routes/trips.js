const { Router } = require("express");
const tripsController = require("../controllers/trips");

const router = Router();
router
  .get("/", tripsController.tripsList)
  .post("/", tripsController.tripsAddTrip);

router
  .get("/:tripCode", tripsController.tripsFindByCode)
  .put("/:tripCode", tripsController.tripsUpdateTrip)
  .delete("/:tripCode", tripsController.tripsDeleteTrip);

module.exports = router;
