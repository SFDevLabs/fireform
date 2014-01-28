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
    .directive("mySnippet", function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/nav.html',
            replace: true
        };
    })
    .directive("navTwo", function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/nav-two.html',
            replace: true
        };
    });;