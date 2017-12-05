'use strict';

/**
 * 数字
 */
exports.integer = integer;
function integer(obj) {
    return obj.value;
}

exports.bool = bool;
function bool(obj) {
    return obj.value;
}

/**
 * 字符串，采用单引号包裹
 */
exports.string = string;
function string (obj) {
    return "'" + obj.value + "'";
}

/**
 * 对象
 */
exports.map = map;
function map(obj) {
    let pair = []
    for (let key in obj.value) {
        let valueObj = obj.value[key];
        let result = variable(valueObj);
        pair.push(`'${key}':${result}`)
    }
    return "{" + pair.join(",") + "}";
}

exports.array = array;
function array(obj) {
    let arr = [];
    let values = [];
    if (obj.isRange) {
        for (var i = Number(obj.value[0]); i <= Number(obj.value[1]); i++) {
            values.push({
                type: 'integer',
                value: i
            });
        }
    } else {
        values = obj.value;
    }
    values.forEach(item => {
        let result = variable(item)
        if (item.type === 'references') {
            result = "{"+ result +"}"
        }
        arr.push(result)
    })
    return "[" + arr.join(",") + "]";
}

exports.math = math;
function math(obj) {
    let left = obj.expression[0],
        right = obj.expression[1];
    if (obj.operator === 'parenthesis') {
        return "(" + variable(left) + ")";
    }
    else if (obj.operator === 'not') {
        return "!" + variable(left);
    } 
    else if (['+','-','*','/','%', '>','<','>=','<=','==','!=','&&','||'].indexOf(obj.operator) !== -1) {
        return variable(left) + obj.operator + variable(right);
    }
}

/**
 * 引用
 */
exports.references = references;
function references(referObj) {
    if (!referObj.path) {
        return "{$" + referObj.id + "}";
    }
    else {
        var result = referObj.id;
        referObj.path.forEach(p => {
            switch (p.type) {
                case 'property': result += property(p); break;
                case 'index': result += index(p); break;
            }
        });
        return "{$" + result + "}";
    }
}

/**
 * 引用点连接
 */
function property(p) {
    return '.' + p.id;
}
/**
 * 引用方括号连接
 */
function index(p) {
    if (p.id.type === 'integer') {
        return "[" + integer(p.id) + "]";
    }
    else if (p.id.type === 'string') {
        return "[" + string(p.id) + "]";
    }
    else if (p.id.type === 'references') {
        return "[" + references(p.id) + "]";
    }
}

/**
 * 变量, 没有被{}包裹
 */
exports.variable = variable;
function variable(varObj) {
    let result;
    if (varObj.type === 'integer') {
        result = integer(varObj);
    }
    else if (varObj.type === 'bool') {
        result = bool(varObj);
    }
    else if (varObj.type === 'string') {
        result = string(varObj);
    }
    else if (varObj.type === 'references') {
        result = references(varObj);
        result = result.replace(/^\{|\}$/g, '');
    }
    else if (varObj.type === 'map') {
        result = map(varObj);
    }
    else if (varObj.type === 'array') {
        result = array(varObj);
    }
    else if (varObj.type === 'math') {
        result = math(varObj);
    }
    else {
        result = varObj.value;
    }
    return result;
}