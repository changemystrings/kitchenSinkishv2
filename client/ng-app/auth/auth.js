angular.module('kitchen-sinkish.auth', [
  'ui.router'
])

  .config(
  ['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {


      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      $stateProvider

        //////////
        // Home //
        //////////

        .state("auth", {
          url: "/auth",
          templateUrl: "ng-app/auth/auth-home.html",
          controller: 'AuthHomeCtrl'
        })
    }
  ]
)

  .controller('AuthHomeCtrl', ['$scope', '$stateParams', '$state', '$http', '$rootScope', 'UserService', function ($scope, $stateParams, $state, $http, $rootScope, UserService) {

    //Need to intercept the tab click - otherwise ui-router will attempt to route to new state
      $('.nav-tabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
      });
    $scope.signUpLocal = function () {

      $http(
        {
          method: 'post',
          url: '/auth/signup/local',
          data: {email: $scope.email, password: $scope.password}
        }
      )
        .success(function (data, status, headers, config) {
            UserService.authStatus = true;
          $scope.authMessage = data.message;
        })
        .error(function () {
            //TODO Change this to redirect to error state
            $scope.authMessage = 'There was an error processing your request';
        })
    };
    $scope.authenticateLocal = function () {
      $http(
        {
          method: 'post',
          url: '/auth/authenticate/local',
          data: {email: $scope.loginEmail, password: $scope.loginPassword}
        }
      )
        .success(function (data, status, headers, config) {
            $scope.authMessage = data.message;
            if (data.authStatus == true) {
              UserService.authStatus = true;
              sessionStorage.setItem('authStatus','true');
            }
        })
        .error(function () {
            //TODO Change this to redirect to error state
          $scope.authMessage = 'There was an error processing your request';
        })
    };
  }])
;
