'use strict';
var fs = require('fs');
var rework = require('rework');
var expect = require('expect.js');
var plugin = require('../index');

describe('zyndexer', function () {
    it('should transform a simple css file', function () {
        var css = fs.readFileSync('./tests/fixtures/simple.css', 'utf8').trim();
        var output = rework(css)
            .use(plugin({
                limit: 100
            })).toString();

        var expected = fs.readFileSync('./tests/expected/simple.css', 'utf8').trim();
        expect(output).to.eql(expected);
    });

    it('should successfully transform the bootstrap css fixture', function () {
        var css = fs.readFileSync('./tests/fixtures/bootstrap.css', 'utf8').trim();
        var output = rework(css)
            .use(plugin({
                limit: 100
            })).toString();

        var expected = fs.readFileSync('./tests/expected/bootstrap.css', 'utf8').trim();
        expect(output).to.eql(expected);
    });

    it('should should throw when limit is too low', function () {
        var css = fs.readFileSync('./tests/fixtures/bootstrap.css', 'utf8').trim();
        var args = plugin({
            limit: 5
        });
        var instance = rework(css);
        expect(instance.use.bind(instance)).withArgs(args).to.throwException(/Count of unique items .* is more than/);
    });
});
