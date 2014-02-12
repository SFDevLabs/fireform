'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

.controller('PublicHomeCtrl', ['$rootScope', '$scope', 'syncData',
    function($rootScope, $scope, syncData) {
        syncData('syncedValue').$bind($scope, 'syncedValue');
    }
])

.controller('docController', ['$rootScope', '$scope', 'syncData',
    function($rootScope, $scope, syncData) {
        syncData('syncedValue').$bind($scope, 'syncedValue');
    }
])


.controller('AppHomeCtrl', ['$scope', 'loginService', 'syncData',
    function($scope, loginService, syncData) {
        //alert($scope.username);
        // constrain number of messages by limit into syncData
        // add the array into $scope.messages
        $scope.Lists = syncData('users/' + $scope.auth.user.uid + '/lists', 10);
        syncData('syncedValue').$bind($scope, 'syncedValue');
    }
])

.controller('ChatCtrl', ['$scope', 'syncData',
    function($scope, syncData) {
        $scope.newMessage = null;

        // constrain number of messages by limit into syncData
        // add the array into $scope.messages
        $scope.messages = syncData('messages', 10);

        //$scope.user = syncData('user');
        //syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

        // add new messages to the list
        $scope.addMessage = function() {
            if ($scope.newMessage) {
                $scope.messages.$add({
                    text: $scope.newMessage
                });
                $scope.newMessage = null;
            }
        };
    }
])

.controller('LoginCtrl', ['$scope', 'loginService', '$location',
    function($scope, loginService, $location) {
        $scope.email = null;
        $scope.pass = null;
        $scope.confirm = null;
        $scope.createMode = false;

        $scope.login = function(cb) {
            $scope.err = null;
            if (!$scope.email) {
                $scope.err = 'Please enter an email address';
            } else if (!$scope.pass) {
                $scope.err = 'Please enter a password';
            } else {
                loginService.login($scope.email, $scope.pass, function(err, user) {
                    $scope.err = err ? err + '' : null;
                    if (!err) {
                        cb && cb(user);
                    }
                });
            }
        };

        $scope.createAccount = function() {
            $scope.err = null;
            if (assertValidLoginAttempt()) {
                loginService.createAccount($scope.email, $scope.pass, function(err, user) {
                    if (err) {
                        $scope.err = err ? err + '' : null;
                    } else {
                        // must be logged in before I can write to my profile
                        $scope.login(function() {
                            loginService.createProfile(user.uid, user.email);
                            $location.path('/account');
                        });
                    }
                });
            }
        };

        function assertValidLoginAttempt() {
            if (!$scope.email) {
                $scope.err = 'Please enter an email address';
            } else if (!$scope.pass) {
                $scope.err = 'Please enter a password';
            } else if ($scope.pass !== $scope.confirm) {
                $scope.err = 'Passwords do not match';
            }
            return !$scope.err;
        }
    }
])

.controller('SignupCtrl', ['$scope', 'loginService', '$location',
    function($scope, loginService, $location) {
        $scope.email = null;
        $scope.pass = null;
        $scope.confirm = null;
        $scope.createMode = false;

        $scope.login = function(cb) {
            $scope.err = null;
            if (!$scope.email) {
                $scope.err = 'Please enter an email address';
            } else if (!$scope.pass) {
                $scope.err = 'Please enter a password';
            } else {
                loginService.login($scope.email, $scope.pass, function(err, user) {
                    $scope.err = err ? err + '' : null;
                    if (!err) {
                        cb && cb(user);
                    }
                });
            }
        };

        $scope.createAccount = function() {
            $scope.err = null;
            if (assertValidLoginAttempt()) {
                loginService.createAccount($scope.email, $scope.pass, function(err, user) {
                    if (err) {
                        $scope.err = err ? err + '' : null;
                    } else {
                        // must be logged in before I can write to my profile
                        $scope.login(function() {
                            loginService.createProfile(user.uid, user.email);
                            $location.path('/account');
                        });
                    }
                });
            }
        };

        function assertValidLoginAttempt() {
            if (!$scope.email) {
                $scope.err = 'Please enter an email address';
            } else if (!$scope.pass) {
                $scope.err = 'Please enter a password';
            } else if ($scope.pass !== $scope.confirm) {
                $scope.err = 'Passwords do not match';
            }
            return !$scope.err;
        }
    }
])

.controller('AccountCtrl', ['$scope', 'loginService', 'syncData', '$location',
    function($scope, loginService, syncData, $location) {
        syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

        $scope.newList = null;

        // constrain number of messages by limit into syncData
        // add the array into $scope.messages
        $scope.Lists = syncData('users/' + $scope.auth.user.uid + '/lists', 10);

        // add new messages to the list
        $scope.addList = function() {
            if ($scope.newList) {
                $scope.Lists.$add({
                    text: $scope.newList
                });
                $scope.newList = null;
            }
        };


        $scope.logout = function() {
            loginService.logout();
        };

        $scope.oldpass = null;
        $scope.newpass = null;
        $scope.confirm = null;

        $scope.reset = function() {
            $scope.err = null;
            $scope.msg = null;
        };

        $scope.updatePassword = function() {
            $scope.reset();
            loginService.changePassword(buildPwdParms());
        };

        function buildPwdParms() {
            return {
                email: $scope.auth.user.email,
                oldpass: $scope.oldpass,
                newpass: $scope.newpass,
                confirm: $scope.confirm,
                callback: function(err) {
                    if (err) {
                        $scope.err = err;
                    } else {
                        $scope.oldpass = null;
                        $scope.newpass = null;
                        $scope.confirm = null;
                        $scope.msg = 'Password updated!';
                    }
                }
            }
        }

    }
])

.controller('AddCtrl', ['$scope', 'loginService', 'syncData', '$location',
    function($scope, loginService, syncData, $location) {
        syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

        $scope.newList = null;


        $scope.addList = function() {
            if ($scope.newList) {

                var newList = syncData('users/' + $scope.auth.user.uid + '/lists/' + $scope.newList);

                if (newList.$getIndex().length) {
                    alert('Already Exists')
                    return false;
                }
                newList.$set({
                    id: $scope.newList,
                    text: String(new Date())
                });
                // $scope.Lists.$set({
                //     text: $scope.newList
                // });
                $scope.newList = null;
            }
        };


        $scope.logout = function() {
            loginService.logout();
        };


    }
])


.controller('ListCtrl', ['$scope', 'loginService', 'syncData', '$location',
    function($scope, loginService, syncData, $location) {
        syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

        $scope.newList = null;


        // constrain number of messages by limit into syncData
        // add the array into $scope.messages
        $scope.Lists = syncData('users/' + $scope.auth.user.uid + '/lists', 10);

        // add new messages to the list
        $scope.getData = function(list) {
            return 22;
        }
        $scope.addList = function() {
            if ($scope.newList) {

                var newList = syncData('users/' + $scope.auth.user.uid + '/lists/' + $scope.newList);

                if (newList.$getIndex().length) {
                    alert('Already Exists')
                    return false;
                }
                newList.$set({
                    id: $scope.newList,
                    text: String(new Date())
                });
                // $scope.Lists.$set({
                //     text: $scope.newList
                // });
                $scope.newList = null;
            }
        };


        $scope.logout = function() {
            loginService.logout();
        };


    }
])

.controller('listViewCtrl', ['$rootScope','$scope', 'loginService', 'syncData', '$location',
    function($rootScope, $scope, loginService, syncData, $location) {
        syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

        var uid= $scope.auth.user.uid.replace("simplelogin:","")

        ,loc = $location.$$path.replace('/list/'+uid+'/', '')

        $scope.ListView = syncData('users/' + $scope.auth.user.uid + '/lists/' + loc);
        $scope.logout = function() {
            loginService.logout();
        };


    }
])
.controller('listViewExampleCtrl', ['$rootScope','$scope', 'loginService', 'syncData', '$location',
    function($rootScope, $scope, loginService, syncData, $location) {
        $scope.ListView = syncData('example');
        $scope.logout = function() {
            loginService.logout();
        };

    }
]);



