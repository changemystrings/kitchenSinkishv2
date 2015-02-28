module.exports = function (app) {


    var config = {
        apiMessageStrings: {
            loginSuccessful: "Congratulations - Passport.js says you're authenticated",
            signupSuccesful: "Congratulations - signup successful",
            signupUnavailable: "Sorry, that email or username is already in use",
            incorrectCredentials: "Incorrect username or password - please try again"
        }

    };

    return config;

    //module.exports.secureLogin = secureLogin();
    //return secureLogin();
}
