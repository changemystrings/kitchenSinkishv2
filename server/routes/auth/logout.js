module.exports = function (app, passport, apiData) {

    //POST authenticate a user using passport local strategy
    app.post('/auth/logout',
        function (req,res) {
            var apiDataObj = new apiData();
            req.logout();
            if (!req.isAuthenticated())
            {
                apiDataObj.jsonData.authStatus = false;
                apiDataObj.jsonData.message = 'You have been logged out';
            }
            else {
                apiDataObj.jsonData.authStatus = true;
                apiDataObj.jsonData.message = 'The application was unable to log you out';
            }
            res.json(apiDataObj);
        }
    );
}
