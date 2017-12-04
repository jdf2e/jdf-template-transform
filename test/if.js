'use strict';

const expect = require('expect.js');
const Velocity = require('velocityjs');
const block = require('../src/smarty/block');

describe(`条件condition`, function () {
    describe('单个if', function () {
        it(`#if($foo==1) class="ab" #end`, function () {
            let asts = Velocity.parse('#if($foo==1) class="ab" #end');
            let result = block.block(asts[0])
            expect(result).to.equal(`{if $foo==1} class="ab" {/if}`)
        });

        it(`#if($foo==1) class="$foo" #end`, function () {
            let asts = Velocity.parse('#if($foo==1) class="$foo" #end');
            let result = block.block(asts[0])
            expect(result).to.equal(`{if $foo==1} class="{$foo}" {/if}`)
        });

        it(`#if($foo==1) class="$foo[0]" #end`, function () {
            let asts = Velocity.parse('#if($foo==1) class="$foo[0]" #end');
            let result = block.block(asts[0])
            expect(result).to.equal(`{if $foo==1} class="{$foo[0]}" {/if}`)
        });

        it(`#if($foo==1) #set($foo = 123) class="$foo" #end`, function () {
            let asts = Velocity.parse('#if($foo==1) #set($foo = 123) class="$foo" #end');
            let result = block.block(asts[0])
            expect(result).to.equal(`{if $foo==1} {$foo=123} class="{$foo}" {/if}`)
        });
    });

    describe('if嵌套', function () {
        it(`#if($foo==1) name="ab" #if($bar == 2) id="ab" #end class="ab" #end`, function () {
            let asts = Velocity.parse(`#if($foo==1) name="ab" #if($bar == 2) id="ab" #end class="ab" #end`);
            let result = block.block(asts[0])
            expect(result).to.equal(`{if $foo==1} name="ab" {if $bar==2} id="ab" {/if} class="ab" {/if}`)
        });
    });
});

// describe(`循环foreach`, function () {
//     describe('简单循环', function () {
//         it(`#foreach ($item in $arr) class="ab" #end`, function () {
//             let asts = Velocity.parse('#foreach ($item in $arr) class="ab" #end');
//             console.log(JSON.stringify(asts[0],null,2))
//         });
//     });
// });