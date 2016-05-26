module.exports = function (gulp, plugins) {
    return function () {
        return gulp.src('src/texen/**/*.{h,cpp}')
            .pipe(plugins.clangFormat.checkFormat('file'));
    };
};
