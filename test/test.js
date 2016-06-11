import test from 'ava';

var exec = require('co-exec');

test('exec()', function * (t) {
    var commit = yield exec('cd moa2/ && ../../node_modules/.bin/ava -v test/');
    console.log(commit)
    t.true(commit == 1);
});
