'use strict';
let fs = require('fs');
let path = require('path');
let Velocity = require('velocityjs');
let c2smarty = require('./c2smarty');

let vm = fs.readFileSync(path.resolve(__dirname, '../test/test.vm')).toString();
let asts = Velocity.parse(vm);

let smartyStr = c2smarty(asts);

console.log(smartyStr);




