const mongoose = require('mongoose');
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    Model
        .find({}) // empty filter for all
        .then(trips => {
            if (!trips) {
                return res
                    .status(404)
                    .json({ 'message': 'trips not found' });
            }

            return res
                .status(200)
                .json(trips);
        },
        err => {
            return res
                .status(404)
                .json(err);
        });
};

// GET: /trips/:tripCode - returns a single trip
const tripsFindByCode = async (req, res) => {
    const tripCode = req.params['tripCode'];

    Model
        .find({ 'code': tripCode })
        .then(trip => {
            if (!trip) {
                return res
                    .status(404)
                    .json({ 'message': 'trip not found' });
            }

            return res
                .status(200)
                .json(trip);
        },
        err => {
            return res
                .status(404)
                .json(err);
        });
};

module.exports = {
    tripsList,
    tripsFindByCode
};