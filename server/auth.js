var okta = require("@okta/okta-sdk-nodejs");
var oidcMiddleware = require("@okta/oidc-middleware");

const config = require("../sassy.config")

var oktaClient = new okta.Client({
    orgUrl: config.user_management.okta.domain,
    token: config.user_management.okta.clientToken
});

const oidc = new oidcMiddleware.ExpressOIDC({
    issuer: `${config.user_management.okta.domain}/oauth2/default`,
    client_id: config.user_management.okta.clientId,
    client_secret: config.user_management.okta.clientSecret,
    redirect_uri: 'http://localhost:3000/users/callback',
    scope: "openid profile",
    routes: {
        login: {
            path: "/users/login"
        },
        callback: {
            path: "/users/callback",
            defaultRedirect: "/dashboard"
        }
    }
});

module.exports = { oidc, oktaClient };
