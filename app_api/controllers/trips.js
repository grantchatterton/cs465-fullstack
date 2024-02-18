const mongoose = require("mongoose");
const Model = mongoose.model("trips");

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
  Model.find({}) // empty filter for all
    .then(
      (trips) => {
        if (!trips) {
          return res.status(404).json({ message: "trips not found" });
        }

        return res.status(200).json(trips);
      },
      (err) => {
        return res.status(404).json(err);
      }
    );
};

// POST: /trips - adds a single trip
const tripsAddTrip = async (req, res) => {
  try {
    const trip = await Model.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    });

    return res
      .status(201) // created
      .json(trip);
  } catch (err) {
    return res
      .status(400) // bad request
      .json(err);
  }
};

// GET: /trips/:tripCode - returns a single trip
const tripsFindByCode = async (req, res) => {
  const tripCode = req.params["tripCode"];

  Model.find({ code: tripCode }).then(
    (trip) => {
      if (!trip) {
        return res.status(404).json({ message: "trip not found" });
      }

      return res.status(200).json(trip);
    },
    (err) => {
      return res.status(404).json(err);
    }
  );
};

const tripNotFound = (tripCode) => {
  return res
    .status(404) // not found
    .json({
      message: `Trip not found with code ${tripCode}`,
    });
};

// PUT: /trips/:tripCode - modifies a single trip
const tripsUpdateTrip = async (req, res) => {
  const tripCode = req.params.tripCode;

  try {
    const trip = await Model.findOneAndUpdate(
      { code: tripCode },
      {
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      },
      { new: true }
    );

    if (!trip) {
      return tripNotFound(tripCode);
    }

    return res.json(trip);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return tripNotFound(tripCode);
    }

    return res
      .status(500) // internal server error
      .json(err);
  }
};

// DELETE: /trips/:tripCode - deletes a single trip
const tripsDeleteTrip = async (req, res) => {
  const tripCode = req.params.tripCode;

  try {
    const trip = await Model.findOneAndDelete({ code: tripCode });
    if (!trip) {
      return tripNotFound(tripCode);
    }

    return res.json(trip);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return tripNotFound(tripCode);
    }

    return res
      .status(500) // internal server error
      .json({
        message: err,
      });
  }
};

module.exports = {
  tripsList,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip,
  tripsFindByCode,
};
