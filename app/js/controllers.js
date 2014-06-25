'use strict';

/* Controllers */

var roadControllers = angular.module('roadControllers', []);

roadControllers.controller('DefaultCtrl', ['$scope',
    function($scope) {
        $scope.test = 'age';
        $scope.roads = roads;
    }]);

roadControllers.controller('RoadCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {

        $scope.road = new Road(roads[$routeParams.roadId]);

        $scope.setImage = function(imageUrl) {
            $scope.mainImageUrl = imageUrl;
        }
    }]);
