

module.exports = function (app, passport) {
    var apiData = {
        currentUser: req.session.currentUser,
        http: {
            statusCode: res.status,
            statusText: ''
        },
        jsonData: {
            data: {},
            message: ''
        }
    };

    return new apiData();

}
