const express = require("express");
const config = require("../config")


const router = express.Router();

// Display the app
router.get("/", (req, res) => {
    res.sendfile(config.app.entry_point);
});


module.exports = router;