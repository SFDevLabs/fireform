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
                    scope.$parent.predicate={col:"_time",value:'value', reverse: true} , //This sets the default sort to most recent
                    valueF._time.value=new Date(scope.valueF._time.value); //Make our a date a time object

                var keys = _.union(//union (join with no duplicates) the new keys with the building list
                    _.pluck(rowsHeader,'fireformName'),
                    _.keys(valueF)
                );  

                scope.$parent.rowsHeader= _.map(keys, function(key){
                    var map
                    if (valueF[key])
                        map=valueF[key];
                    else
                        map= rowsHeader[key];
                    map.fireformName=key
                    return map;
                });
                //Rows
                
                scope.$parent.rows.push(valueF) //Make our a date a time object
                //Kill the element.  Crude but effective.
                el.remove();
            }
        };
    })


.directive("highlight", function($rootScope) {
        return {
            restrict: 'A',
            link: function(scope, el, attr){
                var m=el.html().replace("{{location}}",scope.$location.absUrl())
                el.html(m)
                hljs.highlightBlock(el[0])
            }
        };
    })


