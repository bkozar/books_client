module.exports = (app) => {
    'use strict';

    const headerComponent = {
        bindings: {
            onFiltersApply: '&'
        },
        template: require('./header.View.html'),
        controller: HeaderController,
        controllerAs: 'h'
    };

    app.component('header', headerComponent);

    function HeaderController(BookGenres) {
        const vm = this;

        vm.initialized = false;
        vm.genres = [];
        vm.model = {};

        vm.sortByOptions = [
            { id: 'author', label: 'Author name'},
            { id: 'title', label: 'Book title' }
        ];

        vm.genderOptions = [
            { id: 'f', label: 'Female'},
            { id: 'm', label: 'Male' }
        ];

        vm.$onInit = handleInit;
        vm.onApplyClick = onApplyClick;
        vm.onResetClick = onResetClick;

        ////////////////////////

        function handleInit() {
            _initGenres();
            _setDefaultModel();

            vm.initialized = true;
        }

        function _initGenres() {
            vm.genres = BookGenres.map((option) => ({ id: option, label: option }));
        }

        function onApplyClick() {
            vm.onFiltersApply({ data: _mapFiltersInput(vm.model) });
        }

        function onResetClick() {
            _setDefaultModel();
        }

        function _mapFiltersInput(filters) {
            return {
                genres: filters.genres.map((genre) => genre.id),
                sortBy: filters.sortBy.id,
                genders: filters.genders.id,
                sortDescending: filters.sortDescending
            };
        }

        function _setDefaultModel() {
            vm.model = {
                sortBy: '',
                sortDescending: false,
                genres: [],
                genders: ''
            };
        }
    }
};
