'use strict';
const Velocity = require('velocityjs')
const c2smarty = require('./c2smarty');
const c2trimpath = require('./c2trimpath');

exports.c2smarty = function (content) {
    let asts = Velocity.parse(content);
    let target = c2smarty.convert(asts);
    return target;
}
exports.c2trimpath = function (content) {
    let asts = Velocity.parse(content);
    let target = c2trimpath.convert(asts);
    return target;
};
exports.convert = function (content, type) {
    type = type || 'smarty';
    let convert
    if (type === 'smarty') {
        convert = c2smarty.convert
    } else {
        convert = c2trimpath.convert
    }
    let asts = Velocity.parse(content);
    let target = convert(asts);
    return target;
}