const express = require("express");


const router = express.Router();

// Display the dashboard page
router.get("/", (req, res) => {
    res.json({ profile: req.user ? req.user.profile : null });
});


module.exports = router;