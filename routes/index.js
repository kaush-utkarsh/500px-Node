var express = require('express');
var router = express.Router();
var pages = require("../controllers/PageController")

router.get('/', function (req, res, next) {
    res.render('fetch.html');
});

router.post('/verify500pxCreds', pages.verifyCreds);

module.exports = router;