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
        }
    }
])

.controller('SignupCtrl', ['$scope', 'loginService', '$location', 'syncData',
    function($scope, loginService, $location, syncData) {
        $scope.email = null;
        $scope.pass = null;
        $scope.confirm = null;
        $scope.createMode = false;

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

                            var newList = syncData('users/' + user.uid + '/lists/' + $scope.formName);

                            //Create the form by setting the object in firebase
                            newList.$set({
                                id: $scope.formName,
                                _created: String(new Date())
                            });

                            $location.path('/list');
                        });
                    }
                });
            }
        };

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
        }

        function assertValidLoginAttempt() {
            if (!$scope.email) {
                $scope.err = 'Please enter an email address';
            } else if (!$scope.pass) {
                $scope.err = 'Please enter a password';
            } else if (!$scope.formName) {
                $scope.err = 'Please enter a name for your first form';
            }else if ($scope.formName.search(" ")!==-1) {
                $scope.err = 'Form names can not contain spaces.';
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

        // // add new messages to the list
        // $scope.addList = function() {
        //     if ($scope.newList) {
        //         $scope.Lists.$add({
        //             text: $scope.newList
        //         });
        //         $scope.newList = null;
        //     }
        // };

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
                $scope.err = null;
                var newList = syncData('users/' + $scope.auth.user.uid + '/lists/' + $scope.newList);
                var uid= $scope.auth.user.uid.replace("simplelogin:","");
                //set new list. It will autosync with FB
                if (newList.$getIndex().length) {
                    $scope.err = 'A form repositry with this name already exists!';
                    return false;
                }
                //Check for spaces
                if ($scope.newList.search(" ")!==-1) {
                    $scope.err = 'Form names can not contain spaces.';
                    return false;
                }
                //Create the form by setting the object in firebase
                newList.$set({
                    id: $scope.newList,
                    _created: String(new Date())
                });
                //redirect to the new form
                $location.path( "/list/"+uid+"/"+$scope.newList );
                $scope.newList = null;
            }
        };


    }
])


.controller('ListCtrl', ['$scope', 'loginService', 'syncData', '$location',
    function($scope, loginService, syncData, $location) {
        syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');
        $scope.$location = $location;
        $scope.Lists = syncData('users/' + $scope.auth.user.uid + '/lists', 10);
    }
])

.controller('listViewCtrl', ['$rootScope','$scope', 'loginService', 'syncData', '$location',
    function($rootScope, $scope, loginService, syncData, $location) {
        syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');
        var uid= $scope.auth.user.uid.replace("simplelogin:","")
        ,loc = $location.$$path.replace('/list/'+uid+'/', '')
        $scope.ListView = syncData('users/' + $scope.auth.user.uid + '/lists/' + loc);

        $scope.emailConfirmation = syncData('users/' + $scope.auth.user.uid + '/lists/' + loc+'/emailConfirmation');
        $scope.emailNotification = syncData('users/' + $scope.auth.user.uid + '/lists/' + loc+'/emailNotification');

        $scope.emailNotification.$set(false)
        $scope.$location = $location;

        //delete this form. by calling remove on the firebase object
        $scope.deleteList = function() {
            $scope.ListView.$remove();
            $location.path( "/list");
        }
    }
])
.controller('listViewExampleCtrl', ['$rootScope','$scope', 'loginService', 'syncData', '$location',
    function($rootScope, $scope, loginService, syncData, $location) {
        $scope.ListView = syncData('example');
        $scope.$location = $location;

    }
]);