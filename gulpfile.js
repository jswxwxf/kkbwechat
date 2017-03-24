var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var gulpif = require('gulp-if');
var browserify = require('browserify');
var watchify = require('watchify');
var tsify = require('tsify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rimraf = require('rimraf');
var templateCache = require('gulp-angular-templatecache');

var lcbweb = {
  app: require('./bower.json').appPath || 'app',
  dist: 'dist'
};
lcbweb.dist = lcbweb.app + '/' + lcbweb.dist;

var paths = {
  scripts: [ lcbweb.app + '/**/*.ts' ],
  styles: [ lcbweb.app + '/**/*.scss', '!' + lcbweb.app + '/bower_components/**/*.scss', '!' + lcbweb.app + '/styles/ionic.scss', '!' + lcbweb.app + '/styles/font-awesome.scss' ],
  ionic: [ lcbweb.app + '/styles/ionic.scss'  ],
  fa: [ lcbweb.app + '/styles/font-awesome.scss' ],
  templates: [ lcbweb.app + '/features/**/*.html', lcbweb.app + '/components/**/*.html' ],
  index_pages: [ lcbweb.app + '/*.ejs' ],
  test: [ 'test/spec/**/*.js' ],
  testRequire: [
    lcbweb.app + '/bower_components/angular/angular.js',
    lcbweb.app + '/bower_components/angular-mocks/angular-mocks.js',
    lcbweb.app + '/bower_components/angular-resource/angular-resource.js',
    lcbweb.app + '/bower_components/angular-cookies/angular-cookies.js',
    lcbweb.app + '/bower_components/angular-sanitize/angular-sanitize.js',
    lcbweb.app + '/bower_components/angular-route/angular-route.js',
    'test/mock/**/*.js',
    'test/spec/**/*.js'
  ],
  karma: 'karma.conf.js'
};

////////////////////////
//Reusable pipelines //
////////////////////////

///////////
//Tasks //
///////////

var _watch = false;
gulp.task('browserify', function() {
  return _browserify('app/app.ts', 'app.js');
});
gulp.task('eventify', function() {
  return _browserify('app/event.ts', 'event.js');
});

var _browserify = function(src, dest) {
  var b = browserify({
    entries: src,
    debug: true
  });
  if (_watch) {
    b = watchify(b);
    _watch = false;
  }
  return b
    .plugin('tsify')
    .bundle()
    .on('error', function (err) {
      console.log(err.toString());
      this.emit("end");
    })
    .pipe(source(dest))
    .pipe(buffer())
    // .pipe(plugins.uglify({ mangle: false }))
    .pipe(gulp.dest(lcbweb.dist));
}

gulp.task('usemin', function() {
  return gulp.src(paths.index_pages)
    .pipe(plugins.useref())
    .pipe(gulpif('*.js', plugins.uglify()))
    .pipe(gulp.dest(lcbweb.app));
});

gulp.task('styles', function() {
  
  gulp.src(paths.ionic)
    .pipe(plugins.plumber())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(lcbweb.dist));
  
  gulp.src(paths.fa)
    .pipe(plugins.plumber())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(lcbweb.dist))
  
  return gulp.src(paths.styles)
    .pipe(plugins.plumber())
    .pipe(plugins.concat('all.scss'))   // combine all scss files so can use _media _mixins and _variables together
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.concat('all.css'))
    .pipe(plugins.autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(lcbweb.dist));
  
});

gulp.task('templates', function() {
  return gulp.src(paths.templates)
    .pipe(templateCache({ module: 'lcbapp', transformUrl: function(url) {
      if (url.match(/^directive/)) {
        return 'components/' + url;
      }
      return 'features/' + url;
    }}))
    .pipe(gulp.dest(lcbweb.dist));

});

gulp.task('_watch', function () {
  _watch = true;
  gulp.watch(paths.scripts, [ 'browserify', 'eventify' ]);
  gulp.watch(paths.styles, [ 'styles' ]);
  gulp.watch(paths.ionic, [ 'styles' ]);
  gulp.watch(paths.templates, [ 'templates' ]);
});

///////////
//Build //
///////////

gulp.task('clean', function (cb) {
  rimraf('app/dist', cb);
});

gulp.task('build', [ 'browserify', 'eventify', 'styles', 'templates' ]);
gulp.task('default', [ 'build', 'usemin' ]);
gulp.task('watch', [ 'build', '_watch' ]);
