var fs = require('fs');

var roomList = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));

/* GET rooms view */
const rooms = (req, res) => {
    res.render('rooms', { title: 'Rooms', layout: 'layouts/layout', roomList });
};

module.exports = {
    rooms
};