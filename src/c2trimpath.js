'use strict';

const util = require('./util');
const block = require('./trimpath/block');
const literal = require('./trimpath/literal');

exports.convert = convert;
function convert(asts) {
    let resultArr = [];
    asts.forEach(node => {
        if (util.isString(node)) {
            resultArr.push(node);
        }
        else if (util.isArray(node)) {
            resultArr.push(block.block(node));
        }
        else if (util.isObject(node)) {
            if (node.type === 'references') {
                resultArr.push(literal.references(node));
            }
            else if (node.type === 'set') {
                resultArr.push('【trimpath不支持set】');
            }
        }
        else {
            resultArr.push(node);
        }
    })
    return resultArr.join('');
}