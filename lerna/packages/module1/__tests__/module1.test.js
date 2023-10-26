'use strict';

const module1 = require('..');
const assert = require('assert').strict;

assert.strictEqual(module1(), 'Hello from module1');
console.info('module1 tests passed');
