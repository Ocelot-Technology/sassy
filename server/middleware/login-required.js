// Only let the user access the route if they are authenticated.
function LoginRequired(req, res, next) {
    if (!req.userContext) {
        return res.status(401).render("unauthenticated");
    }

    next();
}

module.exports = LoginRequired;