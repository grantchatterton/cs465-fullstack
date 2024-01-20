/* GET about view */
const about = (req, res) => {
    res.render('about', { title: 'About', layout: 'layouts/layout.hbs' });
};

module.exports = {
    about
};