import test from 'ava';

var exec = require('co-exec');

test('exec()', function * (t) {
    var commit = yield exec('ls -alt|grep test.js|wc -l');

    t.true(commit == 1);
});
