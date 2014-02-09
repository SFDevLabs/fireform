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
     .directive("bodyClassInjectClick", function($rootScope) {
        return {
            restrict: 'A',
            link: function(scope, el, attr){

                scope.stuff=function(){
                    $rootScope.bodyClass=attr.bodyClassInjectClick
                };

                el.bind('click', function(){
                    scope.stuff();
                });
//                $rootScope.bodyClass=attr.bodyClassInject
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

    //make directive to invoke modal