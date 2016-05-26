var texen = require('./lib/texen');

module.exports = function (gulp, plugins) {
    return function (done) {
        texen(gulp, plugins, {
            files: './node_modules/texen-samples/data/*.json',
            dest: './test/output/release/512',
            bin: './dist/texen.exe',
            size: 512
        }, done);
    };
};
