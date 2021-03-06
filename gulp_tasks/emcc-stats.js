var emcc = require('./lib/emcc');

module.exports = function (gulp, plugins) {
    return function (done) {
        emcc(gulp, plugins, {
            emcc: '-D FUNCTION_RECORD -D FUNCTION_DEBUG -D TEXTURE_RECORD ' +
            '-std=c++11 -O2 -Wno-switch -Wno-deprecated-register --closure 1 ' +
            '--memory-init-file 0 ' +
            '-I jsoncpp -I muparser -I texen -I texen/Renders -I texen/HeightMaps ' +
            '-I texen/Functions -I texen/Textures -I texen/Utils ' +
            '-s NO_BROWSER=1 ' +
            '-s EXPORTED_FUNCTIONS="[\'_tx\', \'_txChannels\', \'_txLog\']" ' +
            '-s INVOKE_RUN=0 ' +
            '-s NO_EXIT_RUNTIME=1 ' +
            '-s ASSERTIONS=0 ' +
            '-s AGGRESSIVE_VARIABLE_ELIMINATION=1 ' +
            '-s DEFAULT_LIBRARY_FUNCS_TO_INCLUDE=[\'memcpy\',\'memset\',\'malloc\',\'free\',\'strlen\'] ' +
            '-o',
            files: ['src/texen/**/*.cpp', 'src/jsoncpp/*.cpp', 'src/muparser/*.cpp'],
            options: {
                cwd: './src'
            },
            output: '../dist/texen-core-stats.js'
        }, done);
    };
};
