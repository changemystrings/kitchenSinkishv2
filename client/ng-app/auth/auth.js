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
          url: "/auth?logout",
          templateUrl: "ng-app/auth/auth-home.html",
          controller: 'AuthHomeCtrl',
            stateParams: {'logout': '0'}
        })
          .state("logout", {
            url: "/logout",
            templateUrl: "ng-app/auth/auth-home.html",
            controller: 'AuthLogoutCtrl'
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
      if ($stateParams.logout == '1')
      {
        $scope.authMessage = 'Successfully logged out'
      }
    $scope.signUpLocal = function () {
      $scope.authMessage = null;
      $http(
        {
          method: 'post',
          url: '/auth/signup/local',
          data: {email: $scope.email, password: $scope.password, username: $scope.username}
        }
      )
        .success(function (data, status, headers, config) {
            UserService.authStatus = 'true';
            UserService.username = data.currentUser.nickname;
            UserService.setLocalAuth('true');
          $scope.authMessage = data.jsonData.message;
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
            $scope.authMessage = data.jsonData.message;
            if (data.jsonData.authStatus == true) {
              UserService.authStatus = 'true';
              UserService.username = data.currentUser.nickname;
              UserService.setLocalAuth('true');
            }
        })
        .error(function () {
            //TODO Change this to redirect to error state
          $scope.authMessage = 'There was an error processing your request';
        })
    };
  }])
    .controller('AuthLogoutCtrl', ['$scope', '$stateParams', '$state', '$http', '$rootScope', 'UserService', function ($scope, $stateParams, $state, $http, $rootScope, UserService) {

      //Need to intercept the tab click - otherwise ui-router will attempt to route to new state
      $('.nav-tabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
      });

        $scope.authMessage = null;
        $http(
            {
              method: 'post',
              url: '/auth/logout'
            }
        )
            .success(function (data, status, headers, config) {
              if (data.jsonData.authStatus == false) {
                UserService.authStatus = data.jsonData.authStatus.toString();
                UserService.username = 'Guest';
                UserService.setLocalAuth(data.jsonData.authStatus.toString());
                $state.go('auth', {logout: '1'});
              }

            })
            .error(function () {
              //TODO Change this to redirect to error state
              $scope.authMessage = 'There was an error processing your request';
            })


    }])
;
