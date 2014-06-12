var gulp    = require('gulp'),
    rjs = require('gulp-requirejs'),
    plugins   = require('gulp-load-plugins')(),
    server    = require('tiny-lr')(),
    path      = require('path'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if');



var conf = {
  css: 'App/css',
  scss: 'Engine/scss',
  sass: 'Engine/scss',
  sassStyle: 'expanded',
  img: 'App/img',
  js: 'App/js',
  coffee: 'Engine/js',
  templates: 'Engine/common/templates.hbs',
  styles: 'Engine/scss/*.scss',
  scripts: 'Engine/js/*.coffee'

};

// 1. Connect to the server: at localhost:8080 default

gulp.task('connect', function() {
  plugins.connect.server({
    root: 'App',
    livereload: true
  });
  

});

// 2. Compile the scss files

gulp.task('styles', function(){
  return gulp.src(conf.styles)
    .pipe(gulpif(/[.]scss$/, plugins.compass({
      style: conf.sassStyle,
      css: conf.css,
      sass: conf.sass,
      image: conf.img,

    })))
    .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(conf.css))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(conf.css))
    .pipe(connect.reload())
    .pipe(plugins.notify({message: 'Styles task complete'}));
});

// 3. Compile coffescript file app.coffee

gulp.task('coffee', function() {
  return gulp.src('Engine/js/*.coffee')
    //.pipe(gulp.dest(conf.js))
    .pipe(
      plugins.coffee({bare: true})
        .on('error',plugins.util.log)
    )
    //.pipe(gulp.dest(conf.js))
    .pipe(plugins.concat('app.js'))
    .pipe(gulp.dest('App/js/'))
    //.pipe(gulp.dest(conf.js))
    //.pipe(plugins.rename({suffix: '.min'}))
    //.pipe(plugins.uglify({outSourceMap: true, preserveComments: 'some'}))
    
    .pipe(connect.reload())
    .pipe(plugins.notify({ message: 'Coffee task complete' }));
});


// 3. Compile requireJs Build

gulp.task('requirejsBuild', function() {
  rjs({
        baseUrl: 'App/js/',
        name: 'app',
        out: 'app.js',
        paths : {
          backbone              : '../lib/backbone',
          underscore            : '../lib/underscore',
          jquery                : '../lib/jquery',
          marionette            : '../lib/marionette',
          'backbone.wreqr'      : '../lib/backbone.wreqr',
          'backbone.eventbinder': '../lib/backbone.eventbinder',
          'backbone.babysitter' : '../lib/backbone.babysitter'
        },
        shim : {
          jquery : {
            exports : 'jQuery'
          },
          underscore : {
            exports : '_'
          },
          backbone : {
            deps : ['jquery', 'underscore'],
            exports : 'Backbone'
          },
          marionette : {
            deps : ['jquery', 'underscore', 'backbone'],
            exports : 'Marionette'
          }
        },
        // ... more require.js options
    })
    .pipe(gulp.dest('App/js/')) // pipe it to the output DIR
    .pipe(plugins.notify({message: 'RequireJs task complete'}));


});

 
gulp.task('images', function() {
  return gulp.src('Assets/img/**/*')
    .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('App/img'))
    .pipe(connect.reload())
    .pipe(plugins.notify({ message: 'Images task complete' }));
});
 
gulp.task('clean', function() {
  return gulp.src([conf.css, conf.js, conf.img], {read: false})
    .pipe(plugins.clean());
});
gulp.task('html', function () {

  gulp.src('App/*.html')
    .pipe(connect.reload());
});

gulp.task('templates',function(){
  
});



gulp.task('default', [
  'connect',
  'styles', 
  'coffee',
  'requirejsBuild',
  'images',
  'html', 
  'clean',
  'watch']);
 
gulp.task('watch', function() {

    
  gulp.watch('App/*.html', ['html']);
  // Watch .scss files
  gulp.watch('Engine/scss/app.scss', ['styles']);
  // Watch .js files
  gulp.watch('Engine/js/*.coffee', ['coffee']);

  gulp.watch('App/js/app.js', ['requirejsBuild']);
  // Watch image files
  gulp.watch('App/images/**/*', ['images']);
  

});