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
    .directive("tabletop", function($rootScope) {
        return {
            restrict: 'A',
            link: function(scope, el, attr){
            
                if (!scope.$root.test) scope.$root.test={};

                if (!scope.$root.testTwo) scope.$root.testTwo=[];


                scope.$root.test = _.extend(scope.$root.test, scope.valueF);


                scope.$root.testTwo.push(scope.valueF)


                el.remove();

             

            }
          //  tempalate: "<div></div>"
        };
    })

.directive("rootScope", function($rootScope) {
        return {
            restrict: 'A',
            link: function(scope, el, attr){
                scope.rootScope=function(key, val){
                    scope.$root[key]=val;
                };
            }
        };
    })

