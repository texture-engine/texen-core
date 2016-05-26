'use strict';

var path = require('path');
var glob = require('glob');
var mkdirp = require('mkdirp');
var execFile = require('child_process').execFile;

module.exports = function (gulp, plugins, options, done) {
    var st = {
        sum: 0,
        min: null,
        avg: null,
        max: null,
        items: 0,
        data: []
    };

    function round(v, p) {
        return Math.round(v * p) / p;
    }

    function stat(log, source) {
        try {
            var j = JSON.parse(log);
            st.sum += j.time;
            st.items++;
            var r = round(j.time, 100);
            st.data.push(r);
            st.min = Math.min(st.min, r);
            st.max = Math.max(st.max, r);
        }
        catch (ex) {
            plugins.util.log('Malformed JSON:', source);
        }
    }

    function exe(bin, source, target, size, cb) {
        execFile(bin, [
            '-in', source, '-out', target, '-x', size, '-y', size
        ], function (error, stdout, stderr) {
            if (error) {
                plugins.util.log('Error', source);
                plugins.util.log(JSON.stringify(error));
            }

            if (stderr) {
                plugins.util.log('Error', source);
                plugins.util.log(JSON.stringify(stderr));
            }

            stat(stdout, source);

            cb();
        })
    }

    function run(files, bin, size, cb) {
        var index = 0;

        function iter() {
            if (index >= files.length) {
                return cb();
            }

            var v = files[index++];
            var source = path.resolve(v.src);
            var target = path.resolve(v.dest);
            exe(bin, source, target, size, iter);
        }

        iter();
    }

    glob(options.files, function (err, files) {
        var dest = path.resolve(options.dest);

        var map = files.map(function (file) {
            return {
                src: path.resolve(file),
                dest: path.join(dest, path.basename(file, 'json') + 'png')
            };
        });

        mkdirp(options.dest, function () {
            run(map, path.resolve(options.bin), options.size, function () {
                st.avg = st.sum / st.items;
                st.avg = round(st.avg, 100);
                st.sum = round(st.sum, 100);
                plugins.util.log(JSON.stringify(st));
                done();
            });
        });
    });
};
