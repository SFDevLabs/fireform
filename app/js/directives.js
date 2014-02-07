'use strict';

/* Directives */

angular.module("myApp.directives", [])
    .directive("publicHeader", function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/public-header.html',
            replace: true
        };
    })
