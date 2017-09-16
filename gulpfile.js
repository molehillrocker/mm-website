(function() {
  /* global require */
  'use strict';

  // ==========================================================================

  var gulp = require('gulp');
  var fs = require('fs');
  var path = require('path');
  var del = require('del');
  var runSequence = require('run-sequence');
  var browserSync = require('browser-sync');
  var util = require('gulp-util');
  var concat = require('gulp-concat');
  var rename = require('gulp-rename');
  var notify = require('gulp-notify');
  var eslint = require('gulp-eslint');
  var less = require('gulp-less');
  var minifyCSS = require('gulp-cssnano');
  var minifyHTML = require('gulp-htmlmin');
  var uglify = require('gulp-uglify');
  var inject = require('gulp-inject');
  var angularFilesort = require('gulp-angular-filesort');
  var mainNpmFiles = require('gulp-main-node-files');
  var cached = require('gulp-cached');
  var remember = require('gulp-remember');
  var rev = require('gulp-rev');
  // var debug = require('gulp-debug');

  // ==========================================================================

  // Check if the '--production' flag has been set
  var isProductionMode = !!util.env.production;

  // The SOURCE directories
  var sourceDirName = 'src';
  var sourceDir = path.join('.', sourceDirName);
  var sourceDirScripts = path.join(sourceDir, 'scripts');
  var sourceDirAssets = path.join(sourceDir, 'assets');
  var sourceDirAssetsStyles = path.join(sourceDirAssets, 'styles');
  var sourceDirAssetsImages = path.join(sourceDirAssets, 'images');
  var sourceDirAssetsData = path.join(sourceDirAssets, 'data');
  var sourceDirViews = path.join(sourceDir, 'views');

  // The TARGET directories
  var targetDirName = 'dist';
  var targetDir = path.join('.', targetDirName);
  var targetDirJS = path.join(targetDir, 'js');
  var targetDirJSApp = path.join(targetDirJS, 'app');
  var targetDirJSAppScripts = path.join(targetDirJSApp, 'scripts');
  var targetDirAssets = path.join(targetDir, 'assets');
  var targetDirAssetsStyles = path.join(targetDirAssets, 'css');
  var targetDirAssetsImages = path.join(targetDirAssets, 'img');
  var targetDirAssetsData = path.join(targetDirAssets, 'data');
  var targetDirViews = path.join(targetDir, 'views');
  var targetDirDeps = path.join(targetDir, 'deps');

  // ==========================================================================

  gulp.task('clean', function() {
    return del([path.join(targetDir, '/**/*')]);
  });

  gulp.task('_eslint', function() {
    return gulp.src(path.join(sourceDirScripts, '/**/*.js'))
      .pipe(eslint())
      .pipe(eslint.format())
      // Fail in case of errors
      .pipe(eslint.failAfterError())
      .on('error', notify.onError({
        title: '_eslint',
        message: 'One or more scripts failed ESLint check!'
      }));
  });

  gulp.task('_verify-js', ['_eslint'], function() {
    util.log(util.colors.green('Verification of JavaScript passed. Ready to roll!'));
  });

  gulp.task('verify', ['_verify-js']);

  gulp.task('_build-js', ['_verify-js'], function() {
    return gulp.src(path.join(sourceDirScripts, '/**/*.js'))
      .pipe(isProductionMode ? concat('app.js') : util.noop())
      .pipe(isProductionMode ? uglify() : util.noop())
      .pipe(isProductionMode ? rev() : util.noop())
      .pipe(isProductionMode ? rename({
        suffix: '.min'
      }) : util.noop())
      .pipe(gulp.dest(targetDirJSAppScripts));
  });

  gulp.task('_build-css', function() {
    return gulp.src(path.join(sourceDirAssetsStyles, '/**/*.less'))
      .pipe(less())
      .pipe(isProductionMode ? concat('app.css') : util.noop())
      .pipe(isProductionMode ? minifyCSS() : util.noop())
      .pipe(isProductionMode ? rev() : util.noop())
      .pipe(isProductionMode ? rename({
        suffix: '.min'
      }) : util.noop())
      .pipe(gulp.dest(targetDirAssetsStyles));
  });

  gulp.task('_build-html-views', function() {
    return gulp.src(path.join(sourceDirViews, '/**/*.html'))
      .pipe(cached('html'))
      .pipe(isProductionMode ? minifyHTML({
        collapseWhitespace: true
      }) : util.noop())
      .pipe(remember('html'))
      .pipe(gulp.dest(targetDirViews));
  });

  gulp.task('_build-html-index-file', function() {
    return gulp.src(path.join(sourceDir, 'index.html'))
      .pipe(cached('html'))
      .pipe(isProductionMode ? minifyHTML({
        collapseWhitespace: true
      }) : util.noop())
      .pipe(remember('html'))
      .pipe(gulp.dest(targetDir));
  });

  gulp.task('_build-html', ['_build-html-index-file', '_build-html-views']);

  gulp.task('_build-img', function() {
    return gulp.src(path.join(sourceDirAssetsImages, '/**/*'))
      .pipe(cached('img'))
      // Since we have no images yet, there is nothing to do for this task at the moment
      .pipe(remember('img'))
      .pipe(gulp.dest(targetDirAssetsImages));
  });

  gulp.task('_build-data', function() {
    return gulp.src(path.join(sourceDirAssetsData, '/**/*'))
      .pipe(cached('data'))
      // Simply copy all static data
      .pipe(remember('data'))
      .pipe(gulp.dest(targetDirAssetsData));
  });

  gulp.task('_build-static-assets', ['_build-img', '_build-data']);

  gulp.task('_inject-html', function() {
    var packageJson = JSON.parse(fs.readFileSync('./package.json'));

    var deps = gulp.src(mainNpmFiles({
        overrides: packageJson.overrides
      }), {
        base: 'node_modules'
      })
      .pipe(gulp.dest(targetDirDeps));

    var styles = gulp.src(path.join(targetDirAssetsStyles, '/**/*.css'), {
      read: false
    });

    var scripts = gulp.src(path.join(targetDirJSAppScripts, '/**/*.js'))
      .pipe(angularFilesort());

    return gulp.src(path.join(targetDir, 'index.html'))
      .pipe(inject(deps, {
        name: 'deps',
        ignorePath: targetDirName
      }))
      .pipe(inject(styles, {
        name: 'app',
        ignorePath: targetDirName
      }))
      .pipe(inject(scripts, {
        name: 'app',
        ignorePath: targetDirName
      }))
      .pipe(gulp.dest(targetDir));
  });

  gulp.task('build', ['clean'], function(callback) {
    runSequence(['_build-js', '_build-css', '_build-html', '_build-static-assets'], '_inject-html', callback);
  });

  gulp.task('_watch-js', ['_build-js'], browserSync.reload);

  gulp.task('_watch-html', function() {
    runSequence('_build-html', '_inject-html', browserSync.reload);
  });

  gulp.task('_watch-css', ['_build-css'], browserSync.reload);

  gulp.task('serve', ['build'], function() {
    browserSync.init({
      server: {
        baseDir: targetDir
      },
      port: 8085
    });

    // Watch all JS files
    var watchJS = gulp.watch([
      path.join(sourceDirScripts, '/**/*.js')
    ], ['_watch-js']);
    watchJS.on('change', function(event) {
      if (event.type === 'deleted') {
        delete cached.caches.js[event.path];
        remember.forget('js', event.path);
      }
    });

    // Watch the index.html and all view templates
    var watchHTML = gulp.watch([
      path.join(sourceDirViews, '/**/*.html'),
      path.join(sourceDir, 'index.html')
    ], ['_watch-html']);
    watchHTML.on('change', function(event) {
      if (event.type === 'deleted') {
        delete cached.caches.html[event.path];
        remember.forget('html', event.path);
      }
    });
  });

  // ==========================================================================

  gulp.task('default', function() {
    // Detect the mode we are running.
    var modeType = isProductionMode ? 'production' : 'development';
    // Print a nice console message.
    util.log('Gulp runs in', util.colors.red(modeType), 'mode!');
    // If gulp is called blank (= without a task), run the build task by default...
    gulp.start('build');
  });
})();
