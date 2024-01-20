/* GET contact view */
const contact = (req, res) => {
    res.render('contact', { title: 'Contact', layout: 'layouts/layout' });
};

module.exports = {
    contact
};