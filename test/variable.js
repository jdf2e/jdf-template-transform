'use strict';

const expect = require('expect.js');
const Velocity = require('velocityjs');
const literal = require('../src/smarty/literal');

describe(`变量`, function () {
    describe('pure变量，基本变量，Variables', function () {
        it("$mudSlinger_9->{$mudSlinger_9}", function () {
            let asts = Velocity.parse('$mudSlinger_9');
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$mudSlinger_9}");
        });
        it("$!mudSlinger_9->{$mudSlinger_9}", function () {
            let asts = Velocity.parse('$!mudSlinger_9');
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$mudSlinger_9}");
        });
        it("${mudSlinger_9}->{$mudSlinger_9}", function () {
            let asts = Velocity.parse('${mudSlinger_9}');
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$mudSlinger_9}");
        });
        it("$!{mudSlinger_9}->{$mudSlinger_9}", function () {
            let asts = Velocity.parse('$!{mudSlinger_9}');
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$mudSlinger_9}");
        });
    });
    
    describe("点号连接属性，Properties", function () {
        it("$customer.Address->{$customer.Address}", function () {
            let asts = Velocity.parse('$customer.Address');
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$customer.Address}");
        });
        it("${customer.Address}->{$customer.Address}", function () {
            let asts = Velocity.parse('${customer.Address}');
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$customer.Address}");
        });
        it("$!customer.Address->{$customer.Address}", function () {
            let asts = Velocity.parse('$!customer.Address');
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$customer.Address}");
        });
        it("$!{customer.Address}->{$customer.Address}", function () {
            let asts = Velocity.parse('$!{customer.Address}');
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$customer.Address}");
        });
        it("$customer.Address.more->{$customer.Address.more}", function () {
            let asts = Velocity.parse('$customer.Address.more');
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$customer.Address.more}");
        });
        it("${customer.Address.more}->{$customer.Address.more}", function () {
            let asts = Velocity.parse('${customer.Address.more}');
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$customer.Address.more}");
        });
    });

    describe("方括号连接属性，Properties", function () {
        it("$customer[0]->{$customer[0]}", function () {
            let asts = Velocity.parse('$customer[0]');
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$customer[0]}");
        });

        it("$customer['foo']->{$customer['foo']}", function () {
            let asts = Velocity.parse("$customer['foo']");
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$customer['foo']}");
        });
        it("$customer['foo.a']->{$customer['foo.a']}", function () {
            let asts = Velocity.parse("$customer['foo.a']");
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$customer['foo.a']}");
        });
        
        it("$customer[0].foo->{$customer[0].foo}", function () {
            let asts = Velocity.parse('$customer[0].foo');
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$customer[0].foo}");
        });
        it("$customer['foo'][0]->{$customer['foo'][0]}", function () {
            let asts = Velocity.parse("$customer['foo'][0]");
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$customer['foo'][0]}");
        });
        
        it("$customer[$foo]->{$customer[{$foo}]}", function () {
            let asts = Velocity.parse("$customer[$foo]");
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$customer[{$foo}]}");
        });
        it("$customer[$foo].foo->{$customer[{$foo}].foo}", function () {
            let asts = Velocity.parse("$customer[$foo].foo");
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$customer[{$foo}].foo}");
        });
        it("$customer[$foo.foo].foo->{$customer[{$foo.foo}].foo}", function () {
            let asts = Velocity.parse("$customer[$foo.foo].foo");
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$customer[{$foo.foo}].foo}");
        });
        it("$customer[$foo['foo']].foo->{$customer[{$foo['foo']}].foo}", function () {
            let asts = Velocity.parse("$customer[$foo['foo']].foo");
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$customer[{$foo['foo']}].foo}");
        });
        it("$customer.foo[$foo['foo']]->{$customer.foo[{$foo['foo']}]}", function () {
            let asts = Velocity.parse("$customer.foo[$foo['foo']]");
            let result = literal.references(asts[0]);
            expect(result).to.equal("{$customer.foo[{$foo['foo']}]}");
        });
    });
})