const { verify } = require("jsonwebtoken")
require("dotenv").config()
module.exports = {
    auth: (req, res, next) => {
        var cookies = {},
    
            rc = req.headers.cookie;
    
        // loop thorugh request cookies to set them a key value pair in a JS Object
        rc && rc.split(';').forEach(function (cookie) {
    
            var parts = cookie.split('=');
            cookies[parts.shift().trim()] = decodeURI(parts.join('='));
    
        });
    
        // check if authorization cookie is set with in the request cookies
        if (cookies.auth) {
            if (verify(cookies.auth,process.env.SIGNATURE)) {
                next()
            } else {
                res.sendFile(__dirname + "/login.html")
            }
        } else {
            res.sendFile(__dirname + "/login.html")
        }
    
    }
}