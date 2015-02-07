module.exports = function (app, passport) {
    var apiDataBase = {
        currentUser: {},
        http: {
            statusCode: '',
            statusText: ''
        },
        jsonData: {
            //Holds the data objects returned from the API
            data: {},
            //Holds a one-time message that be leveraged upon receiving response
            message: ''
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
        requiredRoleForRequest: null

    };
    //return apiDataBase;
}