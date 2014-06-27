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
            correlation : false,
            results : false
        };

        $scope.road = new Road(roads[$routeParams.roadId]);
        $scope.base = 10;
        $scope.results = [];

        $scope.calculateRoad = function(base) {

            $scope.averageRoad = new AverageRoad($scope.road);
            $scope.averageRoad.calculateAverageRoad(base);

            $scope.smoothedRoad = new SmoothedRoad($scope.averageRoad);
            $scope.smoothedRoad.approximate();
        };

        $scope.calculateRoadOnMultipleBases = function() {

            $scope.results = [];

            var bases = [1.11, 1.38, 1.66, 1.85, 2.08, 2.22, 2.77, 2.78, 3.46, 3.7, 4.62, 5.53, 5.55, 7.4, 8.3, 9.23, 11.1, 13.85, 16.6, 22.2, 27.7];

            for ( var i = 0; i < bases.length; i ++) {
                var base = bases[i];
                var averageRoad = new AverageRoad($scope.road);
                averageRoad.calculateAverageRoad(base);

                var smoothedRoad = new SmoothedRoad(averageRoad);
                smoothedRoad.approximate();
                $scope.results.push(smoothedRoad);
            }
        };
    }]);
