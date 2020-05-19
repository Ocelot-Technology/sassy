const auth = require("../auth");

// Add a user object onto each request containing relevant user information
function AddUser(req, res, next) {
    if (!req.userContext) {
        return next();
    }

    auth.oktaClient.getUser(req.userContext.userinfo.sub)
        .then(user => {
            req.user = user;
            res.locals.user = user;
            next();
        }).catch(err => {
            next(err);
        });
};

module.exports = AddUser;
