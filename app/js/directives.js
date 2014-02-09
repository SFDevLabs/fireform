'use strict';

/* Directives */

angular.module("myApp.directives", [])
    .directive("tmplAuthInclude", function($rootScope) {
        return {
            restrict: 'E',
            templateUrl: function(el, attr){
            	return $rootScope.auth.user? attr.loggedinSrc : attr.loggedoutSrc;
            }
        };
    })
     .directive("bodyClassInject", function($rootScope) {
        return {
            restrict: 'A',
            link: function(scope, el, attr){
				$rootScope.bodyClass=attr.bodyClassInject
            }
        };
    })
     .directive("bodyClassClick", function($rootScope) {
        return {
            restrict: 'A',
            link: function(scope, el, attr){
                $rootScope.bodyClass=scope.bodyClass;
            }
        };
    })
