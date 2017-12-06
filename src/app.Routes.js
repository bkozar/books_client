module.exports = (app) => {
    app.config(configureStates);

    function configureStates($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('my-app');

        configureLandingPage();

        /////////////////////////////

        function configureLandingPage() {
            $stateProvider.state('my-app', {
                url: '/my-app',
                template: '<books-page></books-page>'
            });
        }
    }
};


