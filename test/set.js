'use strict';

const expect = require('expect.js');
const Velocity = require('velocityjs');
const cSet = require('../src/smarty/set');

describe(`赋值`, function () {
    describe('常量const', function () {
        it('#set($foo = 123) -> {$foo=123}', function () {
            let asts = Velocity.parse('#set($foo = 123)');
            let result = cSet(asts[0]);
            expect(result).to.equal("{$foo=123}")
        })
        it("#set($foo = \"123\") -> {$foo='123'}", function () {
            let asts = Velocity.parse('#set($foo = \"123\")');
            let result = cSet(asts[0]);
            expect(result).to.equal("{$foo='123'}")
        })

        it('#set($foo.abc = 123) -> {$foo.abc=123}', function () {
            let asts = Velocity.parse('#set($foo.abc = 123)');
            let result = cSet(asts[0]);
            expect(result).to.equal("{$foo.abc=123}")
        })
        it("#set($foo['abc'] = \"123\") -> {$foo['abc']='123'}", function () {
            let asts = Velocity.parse('#set($foo[\'abc\'] = \"123\")');
            let result = cSet(asts[0]);
            expect(result).to.equal("{$foo['abc']='123'}")
        })
    });

    describe('变量variable', function () {
        it('#set($foo = $bar) -> {$foo=$bar}', function () {
            let asts = Velocity.parse('#set($foo = $bar)');
            let result = cSet(asts[0]);
            expect(result).to.equal("{$foo=$bar}")
        })

        it('#set($foo[0] = $bar[0]) -> {$foo[0]=$bar[0]}', function () {
            let asts = Velocity.parse('#set($foo[0] = $bar[0])');
            let result = cSet(asts[0]);
            expect(result).to.equal("{$foo[0]=$bar[0]}")
        })

        it('#set($foo[0] = $bar.foo[$foo]) -> {$foo[0]=$bar.foo[{$foo}]}', function () {
            let asts = Velocity.parse('#set($foo[0] = $bar.foo[$foo])');
            let result = cSet(asts[0]);
            expect(result).to.equal("{$foo[0]=$bar.foo[{$foo}]}")
        })
    });

    describe('undefined or null', function () {
        it('vm不支持', ()=>{});
    });

    describe('对象object', function () {
        it('#set($foo = {})报错', function () {
            try {
                let asts = Velocity.parse('#set($foo = {})');
            } catch (e) {
                expect().to.be.ok;
            }
        });
        // it('#set($foo = {"foo": 123}) -> {$foo={\'foo\':123}}', function () {
        //     let asts = Velocity.parse('#set($foo = {\'foo\': 123})');
        //     let result = cSet(asts[0]);
        //     console.log(result)
        // });
        it('smarty不支持对象', ()=>{});
    });

    describe('数组array', function () {
        it('#set($foo = []) -> {$foo=[]}', function () {
            let asts = Velocity.parse('#set($foo = [])');
            let result = cSet(asts[0]);
            expect(result).to.equal("{$foo=[]}")
        });
        it('#set($foo = [0,1,2]) -> {$foo=[0,1,2]}', function () {
            let asts = Velocity.parse('#set($foo = [0,1,2])');
            let result = cSet(asts[0]);
            expect(result).to.equal("{$foo=[0,1,2]}")
        });
        it(`#set($foo = ["0","1","2"]) -> {$foo=['0','1','2']}`, function () {
            let asts = Velocity.parse(`#set($foo = ["0","1","2"])`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo=['0','1','2']}`)
        });

        it(`#set($foo = ["0",1,$foo.foo]) -> {$foo=['0',1,{$foo.foo}]}`, function () {
            let asts = Velocity.parse(`#set($foo = ["0",1,$foo.foo])`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo=['0',1,{$foo.foo}]}`)
        });

        it(`#set($foo.foo = [$foo.foo, [$foo, 1]]) -> {$foo.foo=[{$foo.foo},[{$foo},1]]}`, function () {
            let asts = Velocity.parse(`#set($foo.foo = [$foo.foo, [$foo, 1]])`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo.foo=[{$foo.foo},[{$foo},1]]}`)
        });
    });

    describe('表达式expression', function () {
        it(`#set($foo = 1+1) -> {$foo=1+1}`, function () {
            let asts = Velocity.parse(`#set($foo = 1+1)`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo=1+1}`)
        });
        it(`#set($foo = "a"+"bb") -> {$foo='a'+'bb'}`, function () {
            let asts = Velocity.parse(`#set($foo = "a"+"bb")`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo='a'+'bb'}`)
        });
        it(`#set($foo = "a"+1) -> {$foo='a'+1}`, function () {
            let asts = Velocity.parse(`#set($foo = "a"+1)`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo='a'+1}`)
        });

        it(`#set($foo = $foo+$foo1) -> {$foo=$foo+$foo1}`, function () {
            let asts = Velocity.parse(`#set($foo = $foo+$foo1)`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo=$foo+$foo1}`)
        });

        it(`#set($foo.foo = $foo+1) -> {$foo.foo=$foo+1}`, function () {
            let asts = Velocity.parse(`#set($foo.foo = $foo+1)`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo.foo=$foo+1}`)
        });
    });

    describe('比较表达式compare', function () {
        it(`#set($foo = 2>1) -> {$foo=2>1}`, function () {
            let asts = Velocity.parse(`#set($foo = 2>1)`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo=2>1}`)
        });
        it(`#set($foo = 2<1) -> {$foo=2<1}`, function () {
            let asts = Velocity.parse(`#set($foo = 2<1)`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo=2<1}`)
        });
        it(`#set($foo = 2==1) -> {$foo=2==1}`, function () {
            let asts = Velocity.parse(`#set($foo = 2==1)`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo=2==1}`)
        });
        it(`#set($foo = 2!=1) -> {$foo=2!=1}`, function () {
            let asts = Velocity.parse(`#set($foo = 2!=1)`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo=2!=1}`)
        });
        it(`#set($foo = !1) -> {$foo=!1}`, function () {
            let asts = Velocity.parse(`#set($foo = !1)`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo=!1}`)
        });
        it(`#set($foo = !$foo) -> {$foo=!$foo}`, function () {
            let asts = Velocity.parse(`#set($foo = !$foo)`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo=!$foo}`)
        });
        it(`#set($foo = !$!foo) -> {$foo=!$foo}`, function () {
            let asts = Velocity.parse(`#set($foo = !$!foo)`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo=!$foo}`)
        });
        it(`#set($foo = '2'>=1) -> {$foo='2'>=1}`, function () {
            let asts = Velocity.parse(`#set($foo = '2'>=1)`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo='2'>=1}`)
        });

        it(`#set($foo = 2<=5-1) -> {$foo=2<=5-1}`, function () {
            let asts = Velocity.parse(`#set($foo = 2<=5-1)`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo=2<=5-1}`)
        });

        it(`#set($foo = 2<=(5-1)) -> {$foo=2<=(5-1)}`, function () {
            let asts = Velocity.parse(`#set($foo = 2<=(5-1))`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo=2<=(5-1)}`)
        });

        it(`#set($foo = $foo>=(5-1)) -> {$foo=$foo>=(5-1)}`, function () {
            let asts = Velocity.parse(`#set($foo = $foo>=(5-1))`);
            let result = cSet(asts[0]);
            expect(result).to.equal(`{$foo=$foo>=(5-1)}`)
        });
    });

    describe('三目比较表达式', function () {
        it('velocity不支持三目运算符', ()=>{});
    });

});