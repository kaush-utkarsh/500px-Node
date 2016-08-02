var express = require('express');
var router = express.Router();
var pages = require("../controllers/PageController")

router.get('/', function (req, res, next) {
    // render the landing page
    res.render('fetch.html');
});

router.post('/verify500pxCreds', pages.verifyCreds);
router.post('/imagesFetch', pages.imagesFetch);

module.exports = router;