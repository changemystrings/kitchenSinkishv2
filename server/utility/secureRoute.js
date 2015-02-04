module.exports = function (app, passport) {

    function secureLogin(req, res, next, roleName,apiData) {
        apiData.requestRequiresAuthentication = true;
        apiData.userIsAuthenticated = req.isAuthenticated();
        if (roleName) {
            apiData.requestRequiresAuthorization = true;
            apiData.requiredRoleForRequest = roleName;
            if (req.isAuthenticated()) {
                if (apiData.currentUser.roles && apiData.currentUser.roles.length > 0) {
                    if (apiData.currentUser.roles.indexOf(roleName) >= 0) {
                        apiData.requestIsAuthorized = true;
                        apiData.userHasRequiredRole = true;
                    }
                }
            }
            else {
                apiData.requestIsAuthorized = true;
            }
        }
        else {
            apiData.requestIsAuthorized = req.isAuthenticated();
        }
        next(apiData);
    }

}
