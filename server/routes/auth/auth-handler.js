module.exports = function (app, passport, apiData, configData) {

    //redirect target when a new user signs up successfully
    app.get('/auth/signup/success', function (req, res) {
        //var apiData = req.apiData;
        var apiObj = new apiData().processRoute(req, false, null);
        apiObj.jsonData.message = configData.apiMessageStrings.signupSuccesful;
        apiObj.jsonData.authStatus = true;
        res.json(apiObj);
    });

    //redirect target when a new user has an unsuccessful signup attempt (no server error)
    app.get('/auth/signup/failure', function (req, res) {
        //var apiData = req.apiData;
        var apiObj = new apiData().processRoute(req, false, null);
        apiObj.jsonData.message = configData.apiMessageStrings.signupUnavailable;
        apiObj.jsonData.authStatus = false;
        res.json(apiObj);
    });

    //redirect target when a user has a successful login attempt
    app.get('/auth/authenticate/success', function (req, res) {
        //var apiData = req.apiData;
        var apiObj = new apiData().processRoute(req, false, null);
        apiObj.jsonData.authStatus = true;
        apiObj.jsonData.message = configData.apiMessageStrings.loginSuccessful;
        res.json(apiObj);
    });

    //redirect target when a new user has an unsuccessful login attempt (no server error)
    app.get('/auth/authenticate/failure', function (req, res) {
        //var apiData = req.apiData;
        var apiObj = new apiData().processRoute(req, false, null);
        apiObj.jsonData.authStatus = false;
        apiObj.jsonData.message = configData.apiMessageStrings.incorrectCredentials;
        res.json(apiObj);
    });
}
