module.exports = (app) => {
    'use strict';

    const bookComponent = {
        bindings: {
            bookDetails: '<'
        },
        template: require('./book.View.html'),
        controller: BookController,
        controllerAs: 'b'
    };

    app.component('book', bookComponent);

    function BookController() {
        const vm = this;
        const HALLOWEEN_MONTH = 9;
        const HALLOWEEN_DAY = 31;
        const FRIDAY_INDEX = 5;
        const FINANCE_GENRE = 'finance';
        const HORROR_GENRE = 'horror';

        vm.initialized = false;

        vm.$onInit = handleInit;
        vm.hasHalloweenMark = hasHalloweenMark;
        vm.hasFinanceMark = hasFinanceMark;

        ////////////////////////

        function handleInit() {
            vm.bookDetails.publishedDate = moment(vm.bookDetails.publishedDate);
            vm.initialized = true;
        }

        function hasHalloweenMark() {
            let { publishedDate, genre } = vm.bookDetails;

            return genre === HORROR_GENRE &&
                publishedDate.month() === HALLOWEEN_MONTH &&
                publishedDate.date() === HALLOWEEN_DAY;
        }

        function hasFinanceMark() {
            let { publishedDate, genre } = vm.bookDetails;

            return genre === FINANCE_GENRE &&
                publishedDate.day() === FRIDAY_INDEX &&
                publishedDate.month() !== moment(publishedDate).add(7, 'days').month();
        }
    }
};
