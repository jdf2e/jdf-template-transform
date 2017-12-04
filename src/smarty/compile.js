'use strict';
let util = require('../util');

let reference = require('./reference');


module.exports = function (asts) {
    return dfs(asts);
} 

function dfs(asts) {
    let resultArr = [];
    asts.forEach((node,index) => {
        if (util.isString(node)) {
            resultArr.push(node);
        }
        else if (util.isArray(node)) {
            resultArr.push(dfs(node));
        }
        else if (util.isObject(node)) {
            switch (node.type) {
                case 'references': resultArr.push(reference(node));
            }
        }
        else {
            resultArr.push(node);
        }
    });
    
    return result;
}