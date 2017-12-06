require('bootstrap-webpack');

const angular = require('angular');
const uiRouter = require('angular-ui-router');
const uiSelect = require('ui-select');
require('angularjs-dropdown-multiselect');
require("../node_modules/angular-bootstrap-toggle/dist/angular-bootstrap-toggle.js");

const app = angular.module('app', [uiRouter, uiSelect, 'angularjs-dropdown-multiselect', 'ui.toggle']);

require('./app.Routes.js')(app);
require('./common/common.js')(app);
require('./directives/directives.js')(app);
require('./pages/components.js')(app);
require('./services/services.js')(app);

import './css/index.less';
import './css/variables.less';
