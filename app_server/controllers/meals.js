var fs = require('fs');

var mealList = JSON.parse(fs.readFileSync('./data/meals.json', 'utf8'));

/* GET meals view */
const meals = (req, res) => {
    res.render('meals', { title: 'Meals', layout: 'layouts/layout', mealList });
};

module.exports = {
    meals
};