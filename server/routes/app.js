const express = require("express");


const router = express.Router();

// Display the app
router.get("/", (req, res) => {
    res.render("../../app/index.html");
});


module.exports = router;