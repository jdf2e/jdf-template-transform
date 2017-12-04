module.exports = {
    isArray: function (value) {
        return Object.prototype.toString.call(value) === "[object Array]"
    },
    isString: function (value) {
        return typeof value === 'string'
    },
    isObject: function (value) {
        return Object.prototype.toString.call(value) === "[object Object]"
    }
}