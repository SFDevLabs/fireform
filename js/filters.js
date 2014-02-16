'use strict';

/* Filters */

angular.module('myApp.filters', [])
   .filter('interpolate', ['version', function(version) {
      return function(text) {
         return String(text).replace(/\%VERSION\%/mg, version);
      }
   }])

   .filter('reverse', function() {
      function toArray(list) {
         var k, out = [];
         if( list ) {
            if( angular.isArray(list) ) {
               out = list;
            }
            else if( typeof(list) === 'object' ) {
               for (k in list) {
                  if (list.hasOwnProperty(k)) { out.push(list[k]); }
               }
            }
         }
         return out;
      }
      return function(items) {
         return toArray(items).slice().reverse();
      };
   })
   .filter('orderObjectBy', function() {
     return function(items, col, feild, reverse) {
       var filtered = [];
       angular.forEach(items, function(item) {
         filtered.push(item);
       });
       filtered.sort(function (a, b) {
         return (a[col][feild] > b[col][feild]);
       });
       if(reverse) filtered.reverse();
         return filtered;
  };
});
