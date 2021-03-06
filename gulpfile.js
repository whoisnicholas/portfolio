
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence'),
    autoprefixer = require('gulp-autoprefixer');

// Browser Sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})

var sassOptions = {
errLogToConsole: true,
outputStyle: 'expanded'
};

// Requires the gulp-sass plugin
gulp.task('sass', function() {
  return gulp.src('assets/scss/main.scss') // Gets all files ending with.scss in assets/scss and children dirs
  .pipe(sass(sassOptions).on('error', sass.logError)) // Using gulp-sass
  .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Firefox >= 3'],
      cascade: false
  }))
  .pipe(gulp.dest('assets/css'))
  .pipe(browserSync.reload({
    stream:true
  }))
});

gulp.task('useref', function(){
  return gulp.src('*.html')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

// JavaScript min task
gulp.task('useref', function(){
  return gulp.src('*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});


// Image Optimize
gulp.task('images', function(){
  return gulp.src('assets/images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
    interlaced:true
  })))
  .pipe(gulp.dest('dist/images'))
});

// Font Copy
gulp.task('fonts', function() {
  return gulp.src('assets/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

// Folder Delete
gulp.task('clean:dist', function(){
  return del.sync('dist');
});

// runSequence
gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
});

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
});

// Gulp watch syntax
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('assets/**/*.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('assets/**/*.js', browserSync.reload);
});
