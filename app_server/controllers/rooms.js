/* GET rooms view */
const rooms = (req, res) => {
    res.render('rooms', { title: 'Rooms', layout: 'layouts/layout' });
};

module.exports = {
    rooms
};