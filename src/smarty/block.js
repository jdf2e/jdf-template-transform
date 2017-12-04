'use strict';
const util = require('../util');
const literal = require('./literal');
const cSet = require('./set');

exports.block = block;
function block(blockArr) {
    let target = blockArr[0];
    let closeTag = '', startTag = '';
    if (target.type === 'if') {
        closeTag = '{/if}';
        let condition = literal.variable(target.condition);
        startTag = `{if ${condition}}`;
    }
    else if (target.type === 'foreach') {
        closeTag = '{/section}'
    }

    let others = blockArr.slice(1);

    let resultArr = [];
    others.forEach(node => {
        if (util.isString(node)) {
            resultArr.push(node);
        }
        else if (util.isArray(node)) {
            resultArr.push(block(node));
        }
        else if (util.isObject(node)) {
            if (node.type === 'references') {
                resultArr.push(literal.references(node))
            }
            else if (node.type === 'set') {
                resultArr.push(cSet(node));
            }
        }
        else {
            resultArr.push(node);
        }
    });

    let blockin = resultArr.join("");

    let result = startTag + blockin + closeTag;
    return result;
}
