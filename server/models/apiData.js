

module.exports = function (app, passport) {
    //This object is attached to each response
    //Need to use prototype here to clean values or return new from function

    var apiData = {
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
    app.use(function(req, res, next) {
        //Attaches user object and strips sensitive information
        apiData.currentUser = req.session.currentUser;
        if(apiData.currentUser) {
            apiData.currentUser.local.password = '';
            apiData.currentUser.local.email = '';
        }
        if (req.isAuthenticated()) {
            apiData.userIsAuthenticated = true;
        }
        next();
    })
    return apiData;
}
