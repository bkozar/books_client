module.exports = (app) => {
    'use strict';

    const ghostAnimation = {
        template: require('./ghostAnimation.View.html'),
        controller: GhostAnimationController,
        controllerAs: 'ga'
    };

    app.component('ghostAnimation', ghostAnimation);

    function GhostAnimationController() {
        const vm = this;

        vm.$onInit = handleInit;

        ////////////////////////

        function handleInit() {
            vm.initialized = true;
        }
    }
};
