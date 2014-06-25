'use strict';

/* App Module */

var roadApp = angular.module('roadApp', [
    'ngRoute',
    'roadControllers'
]);

roadApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/default.html',
                controller: 'DefaultCtrl'
            }).
            when('/roads/:roadId', {
                templateUrl: 'partials/road.html',
                controller: 'RoadCtrl'
            }).
            when('/phones/:phoneId', {
                templateUrl: 'partials/phone-detail.html',
                controller: 'PhoneDetailCtrl'
            }).
            otherwise({
                redirectTo: '/#'
            });
    }]);
