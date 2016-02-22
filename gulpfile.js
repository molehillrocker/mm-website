(function() {
  /* global require */
  'use strict';

  // ==========================================================================

  var gulp = require('gulp');
  var path = require('path');
  var del = require('del');
  var runSequence = require('run-sequence');
  var browserSync = require('browser-sync');
  var util = require('gulp-util');
  var concat = require('gulp-concat');
  var rename = require('gulp-rename');
  var notify = require('gulp-notify');
  var jscs = require('gulp-jscs');
  var jshint = require('gulp-jshint');
  var less = require('gulp-less');
  var minifyCSS = require('gulp-cssnano');
  var minifyHTML = require('gulp-htmlmin');
  var uglify = require('gulp-uglify');
  var inject = require('gulp-inject');
  var angularFilesort = require('gulp-angular-filesort');
  var mainBowerFiles = require('gulp-main-bower-files');
  var filter = require('gulp-filter');
  var cached = require('gulp-cached');
  var remember = require('gulp-remember');
  var rev = require('gulp-rev');

  // ==========================================================================

  // Check if the '--production' flag has been set
  var isProductionMode = !!util.env.production;

  // The SOURCE directories
  var sourceDirName = 'src';
  var sourceDir = path.join('.', sourceDirName);
  var sourceDirTypes = path.join(sourceDir, 'types');
  var sourceDirScripts = path.join(sourceDir, 'scripts');
  var sourceDirAssets = path.join(sourceDir, 'assets');
  var sourceDirAssetsStyles = path.join(sourceDirAssets, 'styles');
  var sourceDirAssetsImages = path.join(sourceDirAssets, 'images');
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
  var targetDirViews = path.join(targetDir, 'views');
  var targetDirDeps = path.join(targetDir, 'deps');

  // ==========================================================================

  function getDeps() {
    return gulp.src('./bower.json')
      .pipe(mainBowerFiles(), {
        read: false
      });
  }

  function getAppScripts() {
    return gulp.src(path.join(targetDirJSAppScripts, '/**/*.js'), {
        read: true
      })
      .pipe(angularFilesort());
  }

  // ==========================================================================

  gulp.task('clean', function() {
    return del([path.join(targetDir, '/**/*')]);
  });

  gulp.task('_jscs', function() {
    return gulp.src(path.join(sourceDirScripts, '/**/*.js'))
      .pipe(cached('js'))
      .pipe(jscs())
      .pipe(jshint.reporter('jshint-stylish'))
      // Fail in case of errors
      .pipe(jshint.reporter('fail'))
      .on('error', notify.onError({
        title: '_jshint',
        message: 'One or mor scripts failed JSCS check!'
      }));
  });

  gulp.task('_jshint', function() {
    return gulp.src(path.join(sourceDirTypes, '/**/*.js'))
      .pipe(cached('js'))
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      // Fail in case of errors
      .pipe(jshint.reporter('fail'))
      .on('error', notify.onError({
        title: '_jshint',
        message: 'One or mor scripts failed JSHint check!'
      }));
  });

  gulp.task('_verify-js', ['_jscs', '_jshint'], function() {
    util.log(util.colors.green('JSCS/JSHint on passed. Ready to roll!'));
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

  gulp.task('_build-deps', ['clean'], function() {
    var jsFilter = filter('**/*.js', {
      restore: true
    });

    var cssFilter = filter('**/*.css', {
      restore: true
    });

    var htmlFilter = filter('**/*.html', {
      restore: true
    });

    return getDeps()
      .pipe(isProductionMode ? jsFilter : util.noop())
      .pipe(isProductionMode ? uglify() : util.noop())
      .pipe(isProductionMode ? concat('vendor.js') : util.noop())
      .pipe(isProductionMode ? jsFilter.restore : util.noop())
      .pipe(isProductionMode ? cssFilter : util.noop())
      .pipe(isProductionMode ? minifyCSS() : util.noop())
      .pipe(isProductionMode ? concat('vendor.css') : util.noop())
      .pipe(isProductionMode ? cssFilter.restore : util.noop())
      .pipe(isProductionMode ? htmlFilter : util.noop())
      .pipe(isProductionMode ? minifyHTML() : util.noop())
      .pipe(isProductionMode ? htmlFilter.restore : util.noop())
      .pipe(gulp.dest(path.join(targetDirDeps)));
  });

  gulp.task('_build-html', ['_build-html-index-file', '_build-html-views']);

  gulp.task('_build-img', function() {
    return gulp.src(path.join(sourceDirAssetsImages, '/**/*'))
      .pipe(cached('img'))
      // Since we have no images yet, there is nothing to do for this task at the moment
      .pipe(remember('img'))
      .pipe(gulp.dest(targetDirAssetsImages));
  });

  gulp.task('_inject-html', function() {
    var deps = getDeps()
      .pipe(gulp.dest(path.join(targetDirDeps)));

    var styles = gulp.src(path.join(targetDirAssetsStyles, '/**/*.css'), {
      read: false
    });

    var scripts = getAppScripts();

    return gulp.src(path.join(targetDir, 'index.html'))
      .pipe(inject(deps, {
        name: 'bower',
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
    runSequence(['_build-js', '_build-css', '_build-html', '_build-img'], '_inject-html', callback);
  });

  gulp.task('_watch-js', ['_build-js'], browserSync.reload);

  gulp.task('_watch-html', ['_build-html'], browserSync.reload);

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
      path.join(sourceDirScripts, '/**/*.js'),
      path.join(sourceDirTypes, '/**/*.js')
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
