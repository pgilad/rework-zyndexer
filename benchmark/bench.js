'use strict';
var fs = require('fs');
var rework = require('rework');
var plugin = require('../index');
var fixture = fs.readFileSync('./tests/fixtures/bootstrap-full.css', 'utf8');

bench('rework-zyndexer on bootstrap css', function () {
    rework(fixture)
        .use(plugin({
            limit: 100
        })).toString();
});
