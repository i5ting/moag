import test from 'ava';
var path = require('path')
var assert = require('assert');
var spawn = require('child_process').spawn;
var fs = require('fs');
var exec = require('child_process').exec;

test.cb('exec()', function (t) {
  run('./moa2', ['user','username:string','password:string','avatar:string','phone_number:string','address:string','-k'], function (err, stdout) {
    t.ifError(err);
    console.log(stdout)
    t.pass()
    t.true(true)
    
    ava('./moa2/', ['-v',' test'], function (err1, stdout1) {
          // console.dir(err1)
      // t.ifError(err1);
      console.log(stdout1)
      
      t.regex(err1.actual, /12\stests\spassed/)
      t.end()
    })    
  });
});

function run(dir, args, callback) {
  var binPath = path.resolve(__dirname, '../bin/moag.js');
  var argv = [binPath].concat(args);
  var exec = process.argv[0];
  var stderr = '';
  var stdout = '';


  var child = spawn(exec, argv, {
    cwd: dir
  }); 

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function ondata(str) {
    stdout += str;
  });
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', function ondata(str) {
    process.stderr.write(str);
    stderr += str;
  });

  child.on('close', onclose);
  child.on('error', callback);

  function onclose(code) {
    var err = null;

    try {
      assert.equal(stderr, '');
      assert.strictEqual(code, 0);
    } catch (e) {
      err = e;
    }

    callback(err, stdout.replace(/\x1b\[(\d+)m/g, '_color_$1_'));
  }
}


function ava(dir, args, callback) {
  var avaPath = path.resolve(__dirname, '../node_modules/.bin/ava');
  
  var argv = [avaPath].concat(args);
  var exec = process.argv[0];
  var stderr = '';
  var stdout = '';
  
  var child = spawn(exec, argv, {
    cwd: dir
  }); 

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', function ondata(str) {
    stdout += str;
  });
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', function ondata(str) {
    process.stderr.write(str);
    stderr += str;
  });

  child.on('close', onclose);
  child.on('error', callback);

  function onclose(code) {
    var err = null;
    try {
      assert.equal(stderr, '');
      assert.strictEqual(code, 0);
    } catch (e) {
      err = e;
    }
    console.log(stdout)
    callback(err, stdout.replace(/\x1b\[(\d+)m/g, '_color_$1_'));
  }
}
