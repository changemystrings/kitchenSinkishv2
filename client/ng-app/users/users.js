angular.module('kitchen-sinkish.users', [
  'ui.router'
])

  .config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {


      //////////////////////////
      // State Configurations //
      //////////////////////////

      // Use $stateProvider to configure your states.
      $stateProvider

        //////////
        // Home //
        //////////

        .state("users", {

          // Use a url of "/" to set a state as the "index".
          url: "/users",

          // Example of an inline template string. By default, templates
          // will populate the ui-view within the parent state's template.
          // For top level states, like this one, the parent template is
          // the index.html file. So this template will be inserted into the
          // ui-view within index.html.
          //template: '<p class="lead">The users page</p>'
          templateUrl: "ng-app/users/users-home.html",
          controller: 'UsersCtrl'

        })
    }
  ]
)

  .controller('UsersCtrl', ['$scope', '$stateParams', '$state', '$http',  function($scope,$stateParams,$state,$http){
    $http.get('/users').
      success(function(data, status, headers, config) {
        $scope.users = data;
      }).
      error(function(data, status, headers, config) {
        $scope.users = ["John","Jane"];
      });

  }]);
