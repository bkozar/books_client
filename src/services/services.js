module.exports = (app) => {
    require('./books.Service.js')(app);
    require('./bookGenres.Service.js')(app);
};