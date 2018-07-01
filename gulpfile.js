var autoprefixer    = require('autoprefixer');
var browserSync     = require('browser-sync').create();
var cleancss        = require('gulp-clean-css');
var concat          = require('gulp-concat');
var del             = require('del');
var gulp            = require('gulp');
var gutil           = require('gulp-util');
var imagemin        = require('gulp-imagemin');
var notify          = require('gulp-notify');
var postcss         = require('gulp-postcss');
var rename          = require('gulp-rename');
var run             = require('gulp-run')
var runSequence     = require('run-sequence');
var sass            = require('gulp-ruby-sass');
var uglify          = require('gulp-uglify');

var paths = require('./_assets/gulp_config/paths');

gulp.task('build:styles:main', function() {
  return sass(paths.sassFiles + '/main.scss', {
    style: 'compressed',
    trace: true,
    loadPath: [paths.sassFiles]
  }).pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(cleancss())
    .pipe(gulp.dest(paths.jekyllCssFiles))
    .pipe(gulp.dest(paths.siteCssFiles))
    .pipe(browserSync.stream())
    .on('error', gutil.log);
});

gulp.task('build:styles:critical', function() {
  return sass(paths.sassFiles + '/critical.scss', {
    style: 'compressed',
    trace: true,
    loadPath: [paths.sassFiles]
  }).pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(cleancss())
    .pipe(gulp.dest('_includes'))
    .on('error', gutil.log);
});

gulp.task('build:styles', ['build:styles:main', 'build:styles:critical']);

gulp.task('clean:styles', function(callback) {
  del([paths.jekyllCssFiles + 'main.css',
      paths.siteCssFiles + 'main.css',
      '_includes/critical.css']);
  callback();
});

gulp.task('build:scripts', function() {
  return gulp.src([
    paths.jsFiles + '/global/lib' + paths.jsPattern,
    paths.jsFiles + '/global/*.js'
  ]).pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.jekyllJsFiles))
    .pipe(gulp.dest(paths.siteJsFiles))
    on('error', gutil.log);
});

gulp.task('clean:scripts', function(callback) {
  del([paths.jekyllJsFiles + 'main.js', paths.siteJsFiles + 'main.js']);
  callback();
});

gulp.task('build:images', function() {
  return gulp.src(paths.imageFilesGlob)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.jekyllImageFiles))
    .pipe(gulp.dest(paths.siteImageFiles))
    .pipe(browserSync.stream());
});

gulp.task('clean:images', function(callback) {
  del([paths.jekyllImageFiles, paths.siteImageFiles]);
  callback();
})

gulp.task('build:jekyll', function() {
  var shellCommand = 'bundle exec jekyll build --config _config.yml';

  return gulp.src('')
          .pipe(run(shellCommand))
          .on('error', gutil.log);
});

gulp.task('build', function(callback) {
  runSequence('clean', ['build:scripts', 'build:images', 'build:styles', 'build:jekyll'], callback);
});

gulp.task('clean:jekyll', function(callback) {
  del(['_site']);
  callback();
});

gulp.task('clean', ['clean:jekyll', 'clean:images', 'clean:styles', 'clean:scripts']);

gulp.task('default', ['build']);

gulp.task('build:jekyll:watch', ['build:jekyll'], function(callback) {
  browserSync.reload();
  callback();
});

gulp.task('build:scripts:watch', ['build:scripts'], function(callback) {
  browserSync.reload();
  callback();
});

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: paths.siteDir,
    ghostMode: false,
    logFileChanges: true,
    logLevel: 'debug',
    open: true
  });

  gulp.watch(['_config.yml'], ['build:jekyll:watch']);
  gulp.watch('_assets/styles/**/*.scss', ['build:styles']);
  gulp.watch('_assets/js/**/*.js', ['build:scripts:watch']);
  gulp.watch('**/*.+(md|MD|markdown|MARKDOWN)', ['build:jekyll:watch']);
  gulp.watch('_data/**/*+(yml|yaml|csv|json)', ['build:jekyll:watch']);
  gulp.watch('favicon.png', ['build:jekyll:watch']);
  gulp.watch('_layouts/' + paths.htmlPattern, ['build:jekyll:watch']);
  gulp.watch('_assets/img/' + paths.imagePattern, ['build:jekyll:watch']);
  gulp.watch('./*.html', ['build:jekyll:watch']);
});
