'use strict';
const util = require('../util');
const literal = require('./literal');
const cSet = require('./set');

exports.block = block;
function block(blockArr) {
    let target = blockArr[0];
    let closeTag = '', startTag = '';
    let to = '';
    let loop = '';
    if (target.type === 'if') {
        closeTag = '{/if}';
        let condition = literal.variable(target.condition);
        startTag = `{if ${condition}}`;
    }
    else if (target.type === 'foreach') {
        closeTag = '{/foreach}'
        to = target.to;

        let from = target.from;
        if (from.type === 'references') {
            startTag = `{foreach ${literal.variable(from)} as $${to}}`;
        } 
        else if (from.type === 'array') {
            startTag = `{$loopArr=${literal.array(from)}}{foreach $loopArr as $${to}}`
        }
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
                let smstr = literal.references(node);
                if (smstr === '{$velocityCount}' || smstr === '{$foreach.count}') {
                    // 内置变量
                    resultArr.push(`{$${to}@index}`);
                } else {
                    resultArr.push(smstr);
                }
            }
            else if (node.type === 'set') {
                resultArr.push(cSet(node));
            }
            else if (node.type === 'else') {
                resultArr.push("{else}");
            }
            else if (node.type === 'elseif') {
                let condition = literal.variable(node.condition);
                resultArr.push(`{elseif ${condition}}`);
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
