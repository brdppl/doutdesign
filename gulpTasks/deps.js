const gulp = require('gulp')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')

gulp.task('deps', ['deps.js', 'deps.css', 'deps.fonts'])

gulp.task('deps.js', () => {
    return gulp.src([
        'bower_components/angular/angular.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-touch/angular-touch.min.js',
        'bower_components/angular-i18n/angular-locale_pt-br.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular-ui-mask/dist/mask.min.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/jquery.easing/js/jquery.easing.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.bundle.min.js',
        'node_modules/ui-bootstrap4/dist/ui-bootstrap-tpls.js',
        'bower_components/angular-scroll/angular-scroll.min.js',
        'bower_components/angular-lazy-img/release/angular-lazy-img.min.js',
        'bower_components/wow/dist/wow.min.js',
        'bower_components/angularUtils-pagination/dirPagination.js',
        'bower_components/slick-carousel/slick/slick.js',
        'bower_components/angular-slick/dist/slick.min.js',
        'bower_components/AngularJS-Toaster/toaster.min.js',
        'bower_components/angular-socialshare/dist/angular-socialshare.min.js',
        'bower_components/angular-money-mask/rw-money-mask.min.js',
        'bower_components/scrollreveal/dist/scrollreveal.min.js',
        'bower_components/ngScrollReveal/dist/ngScrollReveal.min.js',
        'bower_components/angular-scroll/angular-scroll.min.js',
        'bower_components/ng-simple-parallax/src/ngParallax.min.js',
        'bower_components/wip-image-zoom/dist/wip-image-zoom.min.js',
        'bower_components/oclazyload/dist/ocLazyLoad.min.js',
        'bower_components/angularjs-slider/dist/rzslider.min.js',
        'bower_components/angular-filter/dist/angular-filter.min.js'
    ])
    .pipe(uglify())
    .pipe(concat('deps.min.js'))
    .pipe(gulp.dest('public/js'))
})

gulp.task('deps.css', () => {
    return gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/animate.css/animate.min.css',
        'bower_components/font-awesome/css/all.min.css',
        'bower_components/slick-carousel/slick/slick.css',
        'bower_components/slick-carousel/slick/slick-theme.css',
        'bower_components/AngularJS-Toaster/toaster.min.css',
        'bower_components/css-hamburgers/dist/hamburgers.min.css',
        'bower_components/wip-image-zoom/dist/wip-image-zoom.min.css',
        'bower_components/angularjs-slider/dist/rzslider.min.css'
    ])
    .pipe(uglifycss({ 'uglyComments': true }))
    .pipe(concat('deps.min.css'))
    .pipe(gulp.dest('public/css'))
})

gulp.task('deps.fonts', () => {
    return gulp.src([
        'bower_components/font-awesome/webfonts/*.*'
    ])
    .pipe(gulp.dest('public/fonts'))
})




// Admin
gulp.task('adminDeps', ['adminDeps.js', 'adminDeps.css', 'adminDeps.fonts'])

gulp.task('adminDeps.js', () => {
    return gulp.src([
        'bower_components/angular/angular.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-touch/angular-touch.min.js',
        'bower_components/angular-i18n/angular-locale_pt-br.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular-ui-mask/dist/mask.min.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/jquery.easing/js/jquery.easing.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'bower_components/angular-scroll/angular-scroll.min.js',
        'bower_components/angular-lazy-img/release/angular-lazy-img.min.js',
        'bower_components/wow/dist/wow.min.js',
        'bower_components/angularUtils-pagination/dirPagination.js',
        'bower_components/slick-carousel/slick/slick.js',
        'bower_components/angular-slick/dist/slick.min.js',
        'bower_components/AngularJS-Toaster/toaster.min.js',
        'bower_components/angular-socialshare/dist/angular-socialshare.min.js',
        'bower_components/angular-money-mask/rw-money-mask.min.js',
        'bower_components/scrollreveal/dist/scrollreveal.min.js',
        'bower_components/ngScrollReveal/dist/ngScrollReveal.min.js',
        'bower_components/angular-scroll/angular-scroll.min.js',
        'bower_components/ng-simple-parallax/src/ngParallax.min.js',
        'bower_components/textAngular/dist/textAngular-rangy.min.js',
        'bower_components/textAngular/dist/textAngular-sanitize.js',
        'bower_components/textAngular/dist/textAngular.min.js'
    ])
    .pipe(uglify())
    .pipe(concat('deps.min.js'))
    .pipe(gulp.dest('public/admin/js'))
})

gulp.task('adminDeps.css', () => {
    return gulp.src([
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/animate.css/animate.min.css',
        'bower_components/font-awesome/css/all.min.css',
        'bower_components/AngularJS-Toaster/toaster.min.css',
        'bower_components/css-hamburgers/dist/hamburgers.min.css',
        'bower_components/textAngular/dist/textAngular.css'
    ])
    .pipe(uglifycss({ 'uglyComments': true }))
    .pipe(concat('deps.min.css'))
    .pipe(gulp.dest('public/admin/css'))
})

gulp.task('adminDeps.fonts', () => {
    return gulp.src([
        'bower_components/font-awesome/webfonts/*.*'
    ])
    .pipe(gulp.dest('public/admin/fonts'))
})