

module.exports = function (app, passport) {
    var apiData = {
        currentUser: {},
        http: {
            statusCode: '',
            statusText: ''
        },
        jsonData: {
            data: {},
            message: '',
            authStatus: ''
        },
        userIsAuthenticated: false
    };
    app.use(function(req, res, next) {
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
