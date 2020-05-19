var okta = require("@okta/okta-sdk-nodejs");
var oidcMiddleware = require("@okta/oidc-middleware");

const config = require("./config")

var oktaClient = new okta.Client({
    orgUrl: config.auth.okta.domain,
    token: config.auth.okta.clientToken
});

const oidc = new oidcMiddleware.ExpressOIDC({
    issuer: `${config.auth.okta.domain}/oauth2/default`,
    client_id: config.auth.okta.clientId,
    client_secret: config.auth.okta.clientSecret,
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
