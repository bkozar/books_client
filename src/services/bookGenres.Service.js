module.exports = (app) => {
    'use strict';

    app.constant('BookGenres', [
        'action',
        'drama',
        'fantasy',
        'finance',
        'history',
        'horror',
        'math',
        'religion',
        'romance',
        'science',
        'science-fiction',
        'travel'
    ]);
};