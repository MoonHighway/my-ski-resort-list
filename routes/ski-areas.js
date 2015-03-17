var express = require('express');
var router = express.Router();

var ResortsModel = require('../models/resorts');
var model = new ResortsModel('https://skimap.org/SkiAreas/index.xml');

var myList = [];

router.get('/myList', function (req, res) {
    res.json(myList);
});

router.post('/myList', function (req, res) {
    var resort = model.getResort(req.body.name);
    myList.push(resort);
    res.json(resort);
});

router.delete('/myList/:id', function(req, res) {
    myList = myList.filter(function (resort) {
        return resort.id !== req.params.id;
    });
    res.json({ removed: true, id: req.params.id });
});

router.get('/names', function (req, res) {
    res.json(model.listAllNames());
});

router.get('/names/:search', function (req, res) {
    if (req.params.search.trim()) {
        model.listNames(req.params.search, function (filteredList) {
            res.json(filteredList);
        });
    }
});

module.exports = router;