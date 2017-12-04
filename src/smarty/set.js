'use strict';
const literal = require('./literal');

module.exports = function (setObj) {
    let left = setObj.equal[0],
        right = setObj.equal[1];
    
    let cleft = literal.variable(left);

    let cright = literal.variable(right);

    return "{" + cleft + "=" + cright + "}"
}