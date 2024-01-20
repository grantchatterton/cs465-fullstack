/* GET travel view */
const travel = (req, res) => {
    res.render('travel', { title: 'Travel', layout: 'layouts/layout' });
};

module.exports = {
    travel
};