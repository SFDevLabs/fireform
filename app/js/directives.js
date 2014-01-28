'use strict';

/* Directives */


// angular.module('myApp.directives', []).
// directive('appVersion', ['version',
//     function(version) {
//         return function(scope, elm, attrs) {
//             elm.text(version);
//         };
//     }
// ])



angular.module("myApp.directives", [])
    .directive("publicHeader", function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/public-header.html',
            replace: true
        };
    })
    .directive("appHeader", function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/app-header.html',
            replace: true
        };
    })
    .directive("subOneHeader", function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/sub-header-one.html',
            replace: true
        };
    })
    .directive("navTwoHeader", function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/sub-header-two.html',
            replace: true
        };
    });