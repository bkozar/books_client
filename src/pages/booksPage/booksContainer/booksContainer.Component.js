module.exports = (app) => {
    'use strict';

    const bookContainerComponent = {
        bindings: {
            books: '<'
        },
        template: require('./booksContainer.View.html'),
        controller: BookContainerController,
        controllerAs: 'bc'
    };

    app.component('booksContainer', bookContainerComponent);

    function BookContainerController() {
        const vm = this;

        vm.initialized = false;

        vm.$onInit = handleInit;

        function handleInit() {
            vm.initialized = true;
        }
    }
};
