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
                //Row Header

                var rowsHeader = scope.$parent.rowsHeader,
                    rows=scope.$parent.rows,
                    valueF=scope.valueF;
                    scope.$parent.predicate="-_time", //This sets the default sort to most recent
                    valueF._time=new Date(scope.valueF._time); //Make our a date a time object

                scope.$parent.rowsHeader = _.union(//union (join with no duplicates) the new keys with the building list
                    rowsHeader,
                    _.keys(valueF)
                );                
                //Rows
                scope.$parent.rows.push(valueF) //Make our a date a time object
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

.directive("highlight", function($rootScope) {
        return {
            restrict: 'A',
            link: function(scope, el, attr){
                debugger

                var m=el.html().replace("{{location}}",scope.$location.absUrl())
                el.html(m)
                hljs.highlightBlock(el[0])
            }
        };
    })


