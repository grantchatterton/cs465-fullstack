const Trip = require('../models/travlr');

/* GET travel view */
const travel = (req, res) => {
    Trip.find().exec()
        .then((trips) => {
            res.render('travel', { title: 'Travel', layout: 'layouts/layout', trips });
        });
};

module.exports = {
    travel
};