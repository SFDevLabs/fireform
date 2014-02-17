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
          var aVal = a[col] && a[col][feild]? a[col][feild]:"";
          var bVal = b[col] && b[col][feild]? b[col][feild]:"";
         return (aVal > bVal);
       });
       if(reverse) filtered.reverse();
         return filtered;
  };
});
