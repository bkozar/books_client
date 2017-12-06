module.exports = (app) => {
    require('./booksPage/book/book.Component.js')(app);
    require('./booksPage/booksPage.Component.js')(app);
    require('./booksPage/booksContainer/booksContainer.Component.js')(app);

};