'use strict';

const expect = require('expect.js');
const Velocity = require('velocityjs');
const block = require('../src/smarty/block');

describe(`循环foreach`, function () {
    describe('简单循环', function () {
        it(`#foreach ($item in $arr) class="ab" #end`, function () {
            let asts = Velocity.parse('#foreach ($item in $arr) class="ab" #end');
            let result = block.block(asts[0]);
            expect(result).to.equal(`{foreach $arr as $item} class="ab" {/foreach}`)
        });
        it(`#foreach ($item in [1,2,3,$foo]) class="ab" #end`, function () {
            let asts = Velocity.parse('#foreach ($item in [1,2,3,$foo]) class="ab" #end');
            let result = block.block(asts[0]);
            expect(result).to.equal(`{$loopArr=[1,2,3,{$foo}]}{foreach $loopArr as $item} class="ab" {/foreach}`)
        });
    });
    describe('内置变量', function () {
        it(`#foreach ($item in $arr) class="$foreach.count" $item get #end`, function () {
            let asts = Velocity.parse('#foreach ($item in $arr) class="$foreach.count" $item get #end');
            let result = block.block(asts[0]);
            expect(result).to.equal(`{foreach $arr as $item} class="{$item@index}" {$item} get {/foreach}`)
        });
        it(`#foreach ($item in $arr) class="$velocityCount" $item get #end`, function () {
            let asts = Velocity.parse('#foreach ($item in $arr) class="$velocityCount" $item get #end');
            let result = block.block(asts[0]);
            expect(result).to.equal(`{foreach $arr as $item} class="{$item@index}" {$item} get {/foreach}`)
        });
    });
    describe('循环嵌套', function () {
        it(`#foreach ($item in $arr) class="ab" #foreach($item1 in $item) 2l $item, $item1 #end #end`, function () {
            let asts = Velocity.parse('#foreach ($item in $arr) class="ab" #foreach($item1 in $item) 2l $item, $item1 #end #end');
            let result = block.block(asts[0]);
            expect(result).to.equal(`{foreach $arr as $item} class="ab" {foreach $item as $item1} 2l {$item}, {$item1} {/foreach} {/foreach}`)
        });
        it(`#foreach ($item in [1,2,3]) class="ab" #foreach($item1 in $item) 2l $item, $item1 #end #end`, function () {
            let asts = Velocity.parse('#foreach ($item in [1,2,3]) class="ab" #foreach($item1 in $item) 2l $item, $item1 #end #end');
            let result = block.block(asts[0]);
            expect(result).to.equal(`{$loopArr=[1,2,3]}{foreach $loopArr as $item} class="ab" {foreach $item as $item1} 2l {$item}, {$item1} {/foreach} {/foreach}`)
        });
    });
});
