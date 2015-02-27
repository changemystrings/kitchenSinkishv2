module.exports = function (app, passport) {
    //This object is attached to each response
    //Need to use prototype here to clean values or return new from function
    var ApiDataRoot = function apiDataRoot(req) {
        var apiData = {
            currentUser: {},
            http: {
                statusCode: '',
                statusText: ''
            },
            jsonData: {
                data: {},
                message: {},
                authStatus: ''
            },
            //true if request passed to secureRoute() function
            requestRequiresAuthentication: false,
            //true if authenticated by passport
            userIsAuthenticated: false,
            //true if user passes secureRoute() function - requires authentication and potentially app role - see utility/secureRoute.js
            requestIsAuthorized: false,
            //true if user has required role to access api resource
            userHasRequiredRole: false,
            //true if the request is for a resource requiring a role
            requestRequiresAuthorization: false,
            //the role required to access the resource
            requiredRoleForRequest: null,
            applyUser: function (req){
                if (req.session) {
                    this.currentUser = req.session.currentUser ? req.session.currentUser : {nickname: 'Unauthenticated'}
                }
            },
            processRoute: function (req, isProtected, roleName) {
                if (req.session) {
                    if (this.currentUser.nickname) {
                    this.currentUser.nickname = req.session.currentUser.nickname ? req.session.currentUser.nickname : {nickname: 'Unauthenticated'}
                    }
                }
                if (isProtected === true) {
                    this.requestRequiresAuthentication = true;

                    this.userIsAuthenticated = req.isAuthenticated();
                    if (roleName) {
                        this.requestRequiresAuthorization = true;
                        this.requiredRoleForRequest = roleName;
                        if (req.isAuthenticated()) {
                            if (this.currentUser.roles && apiData.currentUser.roles.length > 0) {
                                if (this.currentUser.roles.indexOf(roleName) >= 0) {
                                    this.requestIsAuthorized = true;
                                    this.userHasRequiredRole = true;
                                }
                            }
                        }
                    }
                    else {
                        this.requestIsAuthorized = req.isAuthenticated();
                    }
                }
                else {
                    this.requestIsAuthorized = true;
                }

                return this;
            }

        };

        return apiData;
    };
    ApiDataRoot.prototype.populateUser = function (req) {
        this.currentUser = req.session.currentUser ? req.session.currentUser : 'Unauthenticated';
    }
    return ApiDataRoot;
    //Need to track this flow to users and set apiData based on req


}


