'use strict';
var scaler = require('array-scaler');
var pluck = require('lodash.pluck');
var defaults = require('lodash.defaults');

function zyndexer(params) {
    //set default params
    var options = defaults(params || {}, {
        limit: 100,
        step: 1,
        start: 0,
        ignore: []
    });

    if (!Array.isArray(options.ignore)) {
        throw new Error('expecting ignore to be an Array');
    }

    function filterRules(decl) {
        if (decl.property !== 'z-index') {
            return false;
        }
        var value = parseInt(decl.value);
        //only handle numbers (not 'inherit'|'auto' etc.)
        if (typeof value !== 'number') {
            return false;
        }
        //make sure value isn't ignored
        return options.ignore.indexOf(value) === -1;
    }

    function reduceStyles(collect, rule) {
        if (rule.type !== 'rule') {
            return collect;
        }
        var extracted = rule.declarations
            .filter(filterRules)
            .map(function(item) {
                item.value = parseInt(item.value, 10);
                return item;
            });
        return collect.concat(extracted);
    }

    return function(style) {
        //reduce filter and get collection of relevant declarations
        var declarations = style.rules.reduce(reduceStyles, []);
        var arr = pluck(declarations, 'value');
        var scaledArray = scaler.scale(arr, {
            min: options.start,
            max: options.limit,
            step: options.step
        });

        declarations.forEach(function(item, i) {
            item.value = scaledArray[i];
        });
    };
}

module.exports = zyndexer;
