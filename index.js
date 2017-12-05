'use strict';

const fs = require('fs');
const path = require('path');
const Velocity = require('velocityjs')
const c2smarty = require('./src/c2smarty');
const c2trimpath = require('./src/c2trimpath');

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
let convert = exports.convert = function (content, type) {
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

cli();

function cli() {
    let filepath = process.argv[2];
    if (!filepath) {
        return;
    }
    
    let type = process.argv[3] || '-s';
    let convType = type === '-s' ? 'smarty' : 'trimpath';
    
    if (!path.isAbsolute(filepath)) {
        filepath = path.resolve(process.cwd(), filepath);
    }
    
    let dir = path.dirname(filepath);
    let filename = path.basename(filepath).replace(path.extname(filepath), '');
    
    try {
        let content = fs.readFileSync(filepath).toString();
        let target = convert(content, convType);
        fs.writeFileSync(path.resolve(dir, filename+`.${convType}.smarty`), target)
    } catch (e) {
        console.log(e)
    }
}



