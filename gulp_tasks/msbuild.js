module.exports = function (gulp, plugins) {
    return function () {
        return gulp.src('build/msvc2013/texen/texen.sln')
            .pipe(plugins.msbuild({
                targets: ['Rebuild'],
                toolsVersion: 12.0,
                //stdout: true,
                stderr: true,
                properties:{
                    Configuration: 'Release',
                    Platform: 'x64'
                }
            }));
    };
};
