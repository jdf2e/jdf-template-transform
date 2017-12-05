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

    describe('if嵌套nested', function () {
        it(`#if($foo==1) name="ab" #if($bar == 2) id="ab" #end class="ab" #end`, function () {
            let asts = Velocity.parse(`#if($foo==1) name="ab" #if($bar == 2) id="ab" #end class="ab" #end`);
            let result = block.block(asts[0])
            expect(result).to.equal(`{if $foo==1} name="ab" {if $bar==2} id="ab" {/if} class="ab" {/if}`)
        });
    });

    describe('if+else', function () {
        it(`#if($foo==1) name="ab" #else 满500-100 #end`, function () {
            let asts = Velocity.parse(`#if($foo==1) name="ab" #else 满500-100 #end`);
            let result = block.block(asts[0])
            expect(result).to.equal(`{if $foo==1} name="ab" {else} 满500-100 {/if}`)
        });
        it(`#if($foo==1) name="ab" 
            #else 满500-100
            #end`, function () {
            let asts = Velocity.parse(`#if($foo==1) name="ab" 
            #else 满500-100
            #end`);
            let result = block.block(asts[0])
            expect(result).to.equal(`{if $foo==1} name="ab" 
            {else} 满500-100
            {/if}`)
        });
    });

    describe('if+else嵌套nested', function () {
        it(`#if($foo==1) name="ab" #else 满500-#if(true)100#end #end`, function () {
            let asts = Velocity.parse(`#if($foo==1) name="ab" #else 满500-#if(true)100#end #end`);
            let result = block.block(asts[0])
            expect(result).to.equal(`{if $foo==1} name="ab" {else} 满500-{if true}100{/if} {/if}`)
        });
        it(`#if($foo==1)
name="ab"
#else
满500-
#if(true)100#end
#end`, function () {
            let asts = Velocity.parse(`#if($foo==1)
name="ab"
#else
满500-
#if(true)100#end
#end`);
            let result = block.block(asts[0])
            expect(result).to.equal(`{if $foo==1}name="ab"
{else}满500-
{if true}100{/if}{/if}`)
        });
    });

    describe('if elseif else', function () {
        it(`#if($foo==1) name="ab" #elseif($bar == 2) id="ab" #else class="ab" #end`, function () {
            let asts = Velocity.parse(`#if($foo==1) name="ab" #elseif($bar == 2) id="ab" #else class="ab" #end`);
            let result = block.block(asts[0])
            expect(result).to.equal(`{if $foo==1} name="ab" {elseif $bar==2} id="ab" {else} class="ab" {/if}`)
        });
        it(`#if($foo==1) name="ab" #elseif($bar == 2) #if($foo==1) id="ab" #end #else class="ab" #end`, function () {
            let asts = Velocity.parse(`#if($foo==1) name="ab" #elseif($bar == 2) #if($foo==1) id="ab" #end #else class="ab" #end`);
            let result = block.block(asts[0])
            expect(result).to.equal(`{if $foo==1} name="ab" {elseif $bar==2} {if $foo==1} id="ab" {/if} {else} class="ab" {/if}`)
        });
    });
});
