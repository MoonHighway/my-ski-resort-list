var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Ski Resort Maps Developer API',
        nav: [
            {
                text: 'Autocomplete - sample',
                href: '/autocomplete'
            },
            {
                text: 'GET resortnames',
                href: '/resort/names'
            },
            {
                text: 'GET My Resorts',
                href: 'resort/userlist'
            }
        ]
    });
});

module.exports = router;
