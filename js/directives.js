'use strict';

/* Directives */

angular.module("myApp.directives", [])

    // .directive("tmplAuthInclude", function(waitForAuth, $rootScope) {
    //     return {
    //         restrict: 'E',
    //         templateUrl: function(el, attr){
    //             waitForAuth.then(function() {
    //                 return $rootScope.auth.user? attr.loggedinSrc : attr.loggedoutSrc;
    //             })
    //         }
    //     };
    // })
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
                //define the scopped vars where we will build our row header array and rows array.
                if (scope.$root.rowsHeader) scope.$root.rowsHeader=[];
                if (scope.$root.rows) scope.$root.rows=[];
                //Row Header
                scope.$root.rowsHeader = _.union(//union (join with no duplicates) the new keys with the building list
                    scope.$root.rowsHeader,
                    _.keys(scope.valueF)
                );                
                //Rows
                scope.valueF._time=new Date(scope.valueF._time); //Make our a date a time object
                scope.$root.rows.push(scope.valueF) //Make our a date a time object
                //Kill the element.  Crude but effective.
                el.remove();
            }
        };
    })

.directive("rootScope", function($rootScope) {
        return {
            restrict: 'A',
            link: function(scope, el, attr){
                scope.$root.predicate='_time';//set the default;  Why here must it be in the directive.. who knows;
                scope.rootScope=function(key, val){
                    scope.$root[key]=val;
                };
            }
        };
    })

