var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

function getTask(task) {
    return require('./gulp_tasks/' + task)(gulp, plugins);
}

gulp.task('format', getTask('clang-format'));

gulp.task('msbuild', getTask('msbuild'));

gulp.task('emcc:light', getTask('emcc-light'));
gulp.task('emcc:stats', getTask('emcc-stats'));

gulp.task('build:js', ['emcc:light', 'emcc:stats']);
gulp.task('build:exe', ['msbuild'], function () {
    return gulp.src('build/msvc2013/texen/x64/Release/texen.exe').pipe(gulp.dest('dist'));
});

gulp.task('clean', getTask('clean'));
gulp.task('texen:small', ['clean'], getTask('texen-small'));
gulp.task('texen:big', ['clean'], getTask('texen-big'));
gulp.task('test', ['texen:small']);

gulp.task('default', ['format', 'build:js', 'build:exe']);

gulp.task('del', function (done) {
    var del = require('del');

    del(['dist', 'build', 'test/output']).then(function () {
        done();
    });
});
