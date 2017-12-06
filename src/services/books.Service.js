module.exports = (app) => {
    'use strict';

    app.factory('BooksService', BooksService);

    function BooksService($http) {

        const booksService = {
            getAllBooks: getAllBooks,
            filterBooks: filterBooks
        };

        const END_POINT = `http://localhost:3000/books`;

        return booksService;

        ////////////////////

        function getAllBooks() {
            return $http({
                method: 'GET',
                url: END_POINT,
            }).then(_handleBooksResponse);
        }

        function filterBooks(data) {
            return $http({
                method: 'POST',
                data: data,
                url: END_POINT,
            }).then(_handleBooksResponse);
        }

        function _handleBooksResponse(response) {
            return response.data;
        }
    }
};