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
        $scope.visible ={
            coordinates : false,
            average : false,
            smoothed : false,
            correlation : false
        };

        $scope.road = new Road(roads[$routeParams.roadId]);
        $scope.base = 10;

        $scope.calculateAverageRoad = function(base) {
//            $scope.base++;
            $scope.averageRoad = new AverageRoad($scope.road);
            $scope.averageRoad.calculateAverageRoad(base)
        };
        $scope.calculateSmoothedRoad = function() {
            $scope.smoothedRoad = new SmoothedRoad($scope.averageRoad);
            $scope.smoothedRoad.calculate();
        };
        $scope.calculateCorrelation = function() {
            $scope.smoothedRoad.calculateExpectationValue();
            $scope.smoothedRoad.calculateDispersion();
            $scope.smoothedRoad.calculateCorrelation();
        };
    }]);
