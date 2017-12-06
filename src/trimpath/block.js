'use strict';
const util = require('../util');
const literal = require('./literal');

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
        closeTag = '{/for}'
        to = target.to;
        let from = target.from;
        startTag = `{for ${to} in ${literal.variable(from)}}`;
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
                if (smstr === '${velocityCount}' || smstr === '${foreach.count}') {
                    // 内置变量
                    resultArr.push(`\${${to}_index}`);
                } else {
                    resultArr.push(smstr);
                }
            }
            else if (node.type === 'set') {
                resultArr.push('【trimpath不支持set】');
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
