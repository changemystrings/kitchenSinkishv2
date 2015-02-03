module.exports = function (app, passport, apiData) {

    //POST authenticate a user using passport local strategy
    app.post('/auth/logout',
        function (req,res) {
            req.logout();
            if (!req.isAuthenticated())
            {
                apiData.jsonData.authStatus = false;
                apiData.jsonData.message = 'You have been logged out';
            }
            else {
                apiData.jsonData.authStatus = true;
                apiData.jsonData.message = 'The application was unable to log you out';
            }
            res.json(apiData);
        }
    );
}
