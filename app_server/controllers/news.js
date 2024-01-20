/* GET news view */
const news = (req, res) => {
    res.render('news', { title: 'News', layout: 'layouts/layout' });
};

module.exports = {
    news
};