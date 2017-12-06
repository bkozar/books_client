module.exports = (app) => {
    'use strict';

    const coin = {
        template: require('./coin.View.html'),
        controller: CoinController,
        controllerAs: 'c'
    };

    app.component('coin', coin);

    function CoinController() {
        const vm = this;

        vm.$onInit = handleInit;

        ////////////////////////

        function handleInit() {
            vm.initialized = true;
        }
    }
};
