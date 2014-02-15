'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp',
      ['myApp.config', 'myApp.routes', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers',
         'waitForAuth', 'routeSecurity']
   )

   .run(['loginService', '$rootScope', 'FBURL', function(loginService, $rootScope, FBURL) {
      if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
         // double-check that the app has been configured
         angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
         setTimeout(function() {
            angular.element(document.body).removeClass('hide');
         }, 250);
      }
      else {
         // establish authentication
         $rootScope.auth = loginService.init('/login');
         $rootScope.FBURL = FBURL;
      }

      //set root scopefunctions
       $rootScope.logout = function() {
            loginService.logout();
        };

        $rootScope.bodyClassClick = function(bodyClass) {
            $rootScope.bodyClass=bodyClass;
        };
        $rootScope.getTmplUrlforAuth= function(loggedin, loggedout){
            return $rootScope.auth.user ?  loggedin : loggedout;
        }
        $rootScope.JSON2CSV=JSON2CSV;
  
   }]);


function JSON2CSV(objArray, label, quotes) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    debugger
    var str = '',
        line = '';
        // quotes = quotes==="true"?true:false,
        // label = label==="true"?true:false;
    if (label) {
        var head = array[0];
        if (quotes) {
            for (var index in array[0]) {
                var value = index + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
         } else {
            for (var index in array[0]) {
                line += index + ',';
            }
         }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }

    for (var i = 0; i < array.length; i++) {
        var line = '';

        if (quotes) {
            for (var index in array[i]) {
                var value = array[i][index] + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
         } else {
            for (var index in array[i]) {
                line += array[i][index] + ',';
            }
         }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    window.open("data:text/csv;charset=utf-8," + escape(str))
}
        