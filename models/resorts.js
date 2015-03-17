var download = require('mh-xmldown');
var fs = require('fs');

var allSkiResorts = [];

function flattenSkiArea(area) {
    return {
        id: area['$'].id,
        web: (area.officialWebsite) ? area.officialWebsite.toString() : '',
        name: area.name.toString()
    }
}

function Resorts(xml_url) {
    if (xml_url && allSkiResorts.length === 0) {
        if (fs.existsSync('./data/index.xml')) {
            allSkiResorts = require('../data/index').skiAreas.skiArea.map(flattenSkiArea);
        } else {
            download.grab(xml_url, './data', function (err, json) {
                if (err) {
                    throw err;
                }
                allSkiResorts = json.skiAreas.skiArea.map(flattenSkiArea);
            });
        }
    }
}

Resorts.prototype.listNames = function (search_string, done) {
    var list;
    search_string = search_string || "";
    list = allSkiResorts.filter(function (resort) {
        return search_string.toLowerCase() === resort.name.substr(0, search_string.length).toLowerCase();
    });
    done(list.map(function (skiarea) {
        return skiarea.name;
    }));
};

Resorts.prototype.listAllNames = function () {
    return allSkiResorts.map(function (resort) {
        return resort.name;
    });
};

Resorts.prototype.getResort = function (name) {
    return allSkiResorts.filter(function (resort) {
        return resort.name.toLowerCase() === name.toLowerCase();
    })[0];
};

module.exports = Resorts;
