'use strict';

var path = require('path');
var mkdirp = require('mkdirp');
var glob = require('glob');
var exec = require('child_process').exec;

module.exports = function (gulp, plugins, options, done) {
    glob('{' + options.files.join(',') + '}', function (err, files) {
        files.forEach(function (v, k) {
            files[k] = path.resolve(v);
        });

        var cmd = 'emcc.bat';
        var ff = options.emcc + ' ' + options.output;
        var args = ff.split(' ');
        Array.prototype.push.apply(args, files);
        var command = cmd + ' ' + args.join(' ');

        plugins.util.log('Running Emscripten...');

        var dest = path.resolve(path.join(options.options.cwd, path.dirname(options.output)));

        mkdirp(dest, function () {
            var child = exec(command, {
                cwd: options.options.cwd
            });

            child.stdout.on('data', function (d) {
                plugins.util.log(d);
            });

            child.stderr.on('data', function (d) {
                plugins.util.log(d);
            });

            child.on('exit', function (code) {
                plugins.util.log('Emscripten exited with code', code);
                done();
            });
        });
    })
};
