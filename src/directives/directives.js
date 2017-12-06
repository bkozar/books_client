module.exports = (app) => {
    require('./booksVirtualScrollJump.Directive')(app);
    require('./rainBills/rainBills.Directive.js')(app);
};