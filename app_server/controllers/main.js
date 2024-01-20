/* GET homepage */
const index = (req, res) => {
    res.render('index', { title: 'Home', layout: 'layouts/layout' });
};

module.exports = {
    index
};