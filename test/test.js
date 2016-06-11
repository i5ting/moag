import test from 'ava';

var exec = require('co-exec');

test('exec()', function * (t) {
    var commit = yield exec('sh c.sh');
    console.log(commit)
    t.true(commit == 1);
});
