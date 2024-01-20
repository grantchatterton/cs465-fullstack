/* GET meals view */
const meals = (req, res) => {
    res.render('meals', { title: 'Meals', layout: 'layouts/layout' });
};

module.exports = {
    meals
};