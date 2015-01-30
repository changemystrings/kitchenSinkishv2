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

  .controller('AuthHomeCtrl', ['$scope', '$stateParams', '$state', '$http', function ($scope, $stateParams, $state, $http) {

    //$scope.formData = {};
    $scope.signUpLocal = function () {

      $http(
        {
          method: 'post',
          url: '/auth/signup/local',
          data: {email: $scope.email, password: $scope.password}
        }
      )
        .success(function (data, status, headers, config) {
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
