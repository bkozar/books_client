module.exports = (app) => {
    'use strict';

    const booksPageComponent = {
        bindings: {},
        template: require('./booksPage.View.html'),
        controller: BooksPageController,
        controllerAs: 'bp'
    };

    app.component('booksPage', booksPageComponent);

    function BooksPageController(BooksService) {
        const vm = this;

        vm.initialized = false;
        vm.showSpinner = true;
        vm.renderBooks = [];

        vm.$onInit = handleInit;
        vm.filter = filter;
        vm.onScroll = onScroll;

        ////////////////////////

        function handleInit() {
            BooksService.getAllBooks()
                .then(_handleBooksResponse)
                .then(() => {
                    vm.initialized = true;
                })
                .finally(_hideSpinner);
        }

        function filter(data) {
            _showSpinner();
            BooksService.filterBooks(data)
                .then(_handleBooksResponse)
                .finally(_hideSpinner);
        }

        function onScroll(data) {
            vm.renderBooks = data.toRender;
        }

        function _handleBooksResponse(data) {
            vm.books = data;
        }

        function _showSpinner() {
            vm.showSpinner = true;
        }

        function _hideSpinner() {
            vm.showSpinner = false;
        }
    }
};