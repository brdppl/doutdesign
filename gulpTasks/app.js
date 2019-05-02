const gulp = require('gulp')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
const babel = require('gulp-babel')

gulp.task('app', ['app.css', 'app.js', 'app.assets', 'sassdev', 'sassprod', 'responsivedev', 'responsiveprod'])

gulp.task('app.css', () => {
    return gulp.src('app/**/*.css')
    .pipe(uglifycss({ "uglyComments": true }))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('public/css'))
})

gulp.task('app.js', () => {
    return gulp.src('app/**/*.js')
    .pipe(babel({ presets: ['env'] }))
    .pipe(uglify({mangle: false}))
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('public/js'))
})

gulp.task('app.assets', () => {
    return gulp.src('app/**/*.*')
    .pipe(gulp.dest('public'))
})


// Sass
var style = 'app/sass/style.scss'
var responsive = 'app/sass/responsive.scss'
var cssDest = 'public/css'
var sassDevOptions = {
    outputStyle: 'expanded'
}
var sassProdOptions = {
    outputStyle: 'compressed'
}

gulp.task('sassdev', function() {
    return gulp.src(style)
        .pipe(sass(sassDevOptions).on('error', sass.logError))
        .pipe(gulp.dest(cssDest))
})

gulp.task('sassprod', function() {
    return gulp.src(style)
        .pipe(sass(sassProdOptions).on('error', sass.logError))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(cssDest))
})

gulp.task('responsivedev', function() {
    return gulp.src(responsive)
        .pipe(sass(sassDevOptions).on('error', sass.logError))
        .pipe(gulp.dest(cssDest))
})

gulp.task('responsiveprod', function() {
    return gulp.src(responsive)
        .pipe(sass(sassProdOptions).on('error', sass.logError))
        .pipe(concat('responsive.min.css'))
        .pipe(gulp.dest(cssDest))
})




// Admin
gulp.task('adminApp', ['admin.css', 'admin.js', 'admin.assets', 'adminsassdev', 'adminsassprod', 'adminresponsivedev', 'adminresponsiveprod'])

gulp.task('admin.css', () => {
    return gulp.src('admin/**/*.css')
    .pipe(uglifycss({ "uglyComments": true }))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('public/admin/css'))
})

gulp.task('admin.js', () => {
    return gulp.src('admin/**/*.js')
    .pipe(babel({ presets: ['env'] }))
    .pipe(uglify({mangle: false}))
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('public/admin/js'))
})

gulp.task('admin.assets', () => {
    return gulp.src('admin/**/*.*')
    .pipe(gulp.dest('public/admin'))
})


// Sass
var adminStyle = 'admin/sass/style.scss'
var adminResponsive = 'admin/sass/responsive.scss'
var adminCssDest = 'public/admin/css'
var adminSassDevOptions = {
    outputStyle: 'expanded'
}
var adminSassProdOptions = {
    outputStyle: 'compressed'
}

gulp.task('adminsassdev', function() {
    return gulp.src(adminStyle)
        .pipe(sass(adminSassDevOptions).on('error', sass.logError))
        .pipe(gulp.dest(adminCssDest))
})

gulp.task('adminsassprod', function() {
    return gulp.src(adminStyle)
        .pipe(sass(adminSassProdOptions).on('error', sass.logError))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(adminCssDest))
})

gulp.task('adminresponsivedev', function() {
    return gulp.src(adminResponsive)
        .pipe(sass(adminSassDevOptions).on('error', sass.logError))
        .pipe(gulp.dest(adminCssDest))
})

gulp.task('adminresponsiveprod', function() {
    return gulp.src(adminResponsive)
        .pipe(sass(adminSassProdOptions).on('error', sass.logError))
        .pipe(concat('responsive.min.css'))
        .pipe(gulp.dest(adminCssDest))
})