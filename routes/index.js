var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
    res.send("React Blog API").status(200);
});

module.exports = router;
