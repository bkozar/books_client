module.exports = (app) => {
    'use strict';

    const spinnerComponent = {
        template: require('./spinner.View.html'),
        controller: SpinnerController,
        controllerAs: 's'
    };

    app.component('spinner', spinnerComponent);

    function SpinnerController() {
        const vm = this;
    }
};
