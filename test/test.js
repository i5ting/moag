import test from 'ava';

var exec = require('co-exec');

test('exec()', function * (t) {
    var commit = yield exec('ava moa2/test -v');
    console.log(commit)
    t.true(commit == 1);
});
