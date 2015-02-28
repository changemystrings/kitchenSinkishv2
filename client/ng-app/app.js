angular.module('kitchen-sinkish', [
    'kitchen-sinkish.home',
    'kitchen-sinkish.users',
    'kitchen-sinkish.auth',
    'ui.router'
])

    .run(
    ['$rootScope', '$state', '$stateParams', 'UserService',
        function ($rootScope, $state, $stateParams, UserService) {

            // It's very handy to add references to $state and $stateParams to the $rootScope
            // so that you can access them from any scope within your applications.For example,
            // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
            // to active whenever 'contacts.list' or one of its descendents is active.
            $rootScope.$authStatusClient = UserService.authStatus === UserService.constants.stringValues.authStatusTrue ? true : false;
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$user = UserService;
        }
    ]
)
    .service('UserService',['ConstantsService', '$state', function (ConstantsService,$state) {
        var user = {
            constants: ConstantsService,
            authStatus: sessionStorage.getItem(ConstantsService.sessionStorageKeys.authStatus),
            username: ConstantsService.stringValues.defaultUsername,
            userId: '',
            //This function is purely for the UI - api routes are protected on the server
            authorize: function authorizeState(newState,returnState) {
                if (user.authStatus != ConstantsService.stringValues.authStatusTrue) {
                    var returnStateObj = {};
                    if (returnState) {

                        returnStateObj.r = returnState.toString();
                        $state.go(newState, returnStateObj);
                    }
                    else {
                        $state.go(newState, returnStateObj);
                    }
                }
            },
            setLocalAuth: function (authStatus) {
                this.authStatus = authStatus;
                sessionStorage.setItem(ConstantsService.sessionStorageKeys.authStatus, authStatus)
            }
        };
        return user;
    }])
    .service('ConstantsService', function ($state) {
        var config = {
            stringValues: {
                authStatusTrue: 'true',
                authStatusFalse: 'false',
                defaultUsername: 'Guest',
                logoutQueryParam: '1',
                logoutSuccessMessage: 'Successfully Logged Out',
                loginRegisterPrompt: 'Please Login or Register',
                genericRequestError: 'There was an error processing your request',
                httpGetMethodString: 'GET',
                httpPostMethodString: 'POST',
                httpPutMethodString: 'PUT',
                httpDeleteMethodString: 'DELETE'
            },
            sessionStorageKeys: {
                authStatus: 'authStatus'
            }
        };
        return config;
    })
    //This factory wraps the standard angular $http object with specifics for app API
    .factory('ApiService',
    ['UserService', '$http', '$q', function(UserService, $http,$q){
            //Constructor
            function ApiService(UserService, $http, $q) {
                this.baseUri = '';
                this.http = $http;
                this.q = $q;
                this.jsonData = {};
            }

            ApiService.prototype.makeApiCall = function (endpoint, method, apiData) {
                var req = {
                    method: method,
                    url: this.baseUri + endpoint,
                    data: apiData,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                var def =  this.q.defer();

                this.http(req)
                    .success(function (data) {
                        if (data.userIsAuthenticated == false)
                        {
                            UserService.setLocalAuth(UserService.constants.stringValues.authStatusFalse);
                        }
                        def.resolve(data);
                    })
                    .error(function (data) {
                        if (data.userIsAuthenticated == false)
                        {
                            UserService.setLocalAuth(UserService.constants.stringValues.authStatusFalse);
                        }
                        def.resolve(data);
                    })

                return def.promise;
            };
            return new ApiService(UserService,$http,$q);
        }
    ])

    .config(
    ['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            /////////////////////////////
            // Redirects and Otherwise //
            /////////////////////////////

            // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
            $urlRouterProvider

                // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
                // Here we are just setting up some convenience urls.
                .when('/c?id', '/contacts/:id')
                .when('/user/:id', '/contacts/:id')

                // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
                .otherwise('/');


            //////////////////////////
            // State Configurations //
            //////////////////////////

            // Use $stateProvider to configure your states.
            $stateProvider


        }
    ]

)


