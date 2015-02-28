angular.module('kitchen-sinkish.users', [
    'ui.router'
])

    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {


            $stateProvider

                .state("users", {

                    url: "/users",
                    templateUrl: "ng-app/users/users-home.html",
                    controller: 'UsersCtrl',
                    resolve: {
                        PreviousState: [
                            "$state",
                            function ($state) {
                                var currentStateData = {
                                    Name: $state.current.name,
                                    Params: $state.params,
                                    URL: $state.href($state.current.name, $state.params)
                                };
                                //console.log(currentStateData);
                                return currentStateData;
                            }
                        ]
                    }
                })

        }
    ]
)

    .controller('UsersCtrl', ['$scope', '$stateParams', '$state', '$http', 'UserService', 'ApiService', 'PreviousState', function ($scope, $stateParams, $state, $http, UserService, ApiService, PreviousState) {
        UserService.authorize('auth',$state.current.name);
            ApiService.makeApiCall('/users', UserService.constants.stringValues.httpGetMethodString, null)
                .then( function(apiResponse) {
                    $scope.users = apiResponse.jsonData;
                }
            );
    }]);
