'use strict';

const fs = require('fs');
const path = require('path');
const Velocity = require('velocityjs')
const c2smarty = require('./src/c2smarty');

let filepath = process.argv[2];

if (!path.isAbsolute(filepath)) {
    filepath = path.resolve(process.cwd(), filepath);
}

let dir = path.dirname(filepath);
let filename = path.basename(filepath).replace(path.extname(filepath), '');

try {
    let content = fs.readFileSync(filepath).toString();
    let asts = Velocity.parse(content)
    let target = c2smarty.convert(asts);
    fs.writeFileSync(path.resolve(dir, filename+'.c.smarty'), target)
} catch (e) {
    console.log(e)
}

