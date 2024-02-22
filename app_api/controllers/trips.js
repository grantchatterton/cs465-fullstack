const mongoose = require("mongoose");
const Model = mongoose.model("trips");
const User = mongoose.model("users");

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
  try {
    const trips = await Model.find({});
    if (!trips) {
      return res.status(404).json({ message: "trips not found" });
    }

    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const getUser = async (req, res, callback) => {
  const userNotFound = () => {
    return res.status(404).json({ message: "User not found" });
  };

  if (req.auth && req.auth.email) {
    try {
      const user = await User.findOne({ email: req.auth.email });
      if (!user) {
        return userNotFound();
      }

      callback(req, res, user.name);
    } catch (err) {
      console.error(err);
      return res.status(404).json(err);
    }
  } else {
    return userNotFound();
  }
};

// POST: /trips - adds a single trip
const tripsAddTrip = async (req, res) => {
  await getUser(req, res, async (req, res) => {
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
  });
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

// PUT: /trips/:tripCode - modifies a single trip
const tripsUpdateTrip = async (req, res) => {
  const tripCode = req.params.tripCode;

  await getUser(req, res, async (req, res) => {
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
        return res.status(404).json({ message: "Trip not found" });
      }

      return res.json(trip);
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ message: err });
      }

      return res
        .status(500) // internal server error
        .json(err);
    }
  });
};

// DELETE: /trips/:tripCode - deletes a single trip
const tripsDeleteTrip = async (req, res) => {
  const tripCode = req.params.tripCode;

  await getUser(req, res, async (req, res) => {
    try {
      const trip = await Model.findOneAndDelete({ code: tripCode });
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }

      return res.json(trip);
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ message: "Trip not found" });
      }

      return res
        .status(500) // internal server error
        .json(err);
    }
  });
};

module.exports = {
  tripsList,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip,
  tripsFindByCode,
};
