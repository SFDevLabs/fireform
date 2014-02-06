"use strict";

angular.module('myApp.routes', ['ngRoute'])

// configure views; the authRequired parameter is used for specifying pages
// which should only be available while logged in
.config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.when('/', {
            authTMPL: true, // must authenticate before viewing this page
            templateUrlDefault: 'partials/public-home.html',
            templateUrlAuth: 'partials/home.html',
            templateUrl: null,
            controller: 'PublicHomeCtrl'
        });

        $routeProvider.when('/docs', {

            authTMPL: true, // must authenticate before viewing this page
            templateUrlDefault: 'partials/docs.html',
            templateUrlAuth: 'partials/docs_authed.html',
            templateUrl: null,
            controller: 'PublicHomeCtrl'
        });

        $routeProvider.when('/chat', {
            templateUrl: 'partials/chat.html',
            controller: 'ChatCtrl'
        });

        $routeProvider.when('/account', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/account.html',
            controller: 'AccountCtrl'
        });

        $routeProvider.when('/list/:id', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/list-view.html',
            controller: 'listViewCtrl'
        });

        $routeProvider.when('/list', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/lists.html',
            controller: 'ListCtrl'
        });

        $routeProvider.when('/add', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/add.html',
            controller: 'AddCtrl'
        });


        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        });

        $routeProvider.when('/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'SignupCtrl'
        });

        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }
]);