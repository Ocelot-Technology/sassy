const express = require("express");
const loginRequired = require("../middleware/login-required");


const router = express.Router();

// Home page
router.get("/", (req, res) => {
    res.render("home");
});

// Dashboard page
router.get("/dashboard", loginRequired, (req, res) => {
    res.render("dashboard");
});

// User Profile
router.get("/profile", loginRequired, (req, res) => {
    res.json({ profile: req.user ? req.user.profile : null });
});

// Log a user out
router.get("/users/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;