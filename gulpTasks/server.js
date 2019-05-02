const gulp = require('gulp')
const watch = require('gulp-watch')
const webserver = require('gulp-webserver')

gulp.task('watch', () => {
    watch('app/**/*.css', () => gulp.start('app.css'))
    watch('app/sass/style.scss', () => gulp.start(['sassdev', 'sassprod']))
    watch('app/sass/responsive.scss', () => gulp.start(['responsivedev', 'responsiveprod']))
    watch('app/**/*.js', () => gulp.start('app.js'))
    watch('app/**/*.*', () => gulp.start('app.assets'))
})

gulp.task('server', ['watch'], () => {
    return gulp.src('public')
    .pipe(webserver({
        livereload: true,
        port: 3000,
        open: true,
        fallback: 'index.html'
    }))
})


// Admin
gulp.task('adminWatch', () => {
    watch('admin/**/*.css', () => gulp.start('admin.css'))
    watch('admin/sass/style.scss', () => gulp.start(['adminsassdev', 'adminsassprod']))
    watch('admin/sass/responsive.scss', () => gulp.start(['adminresponsivedev', 'adminresponsiveprod']))
    watch('admin/**/*.js', () => gulp.start('admin.js'))
    watch('admin/**/*.*', () => gulp.start('admin.assets'))
})

gulp.task('adminServer', ['adminWatch'], () => {
    return gulp.src('public/admin')
    .pipe(webserver({
        livereload: true,
        port: 4000,
        open: true,
        fallback: 'index.html'
    }))
})