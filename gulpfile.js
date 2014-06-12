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
          jquery:                 "../bower_components/jquery/jquery",
          underscore:             "../bower_components/underscore-amd/underscore",
          backbone:               "../bower_components/backbone-amd/backbone",
          "backbone.babysitter":  "../bower_components/backbone.babysitter/lib/amd/backbone.babysitter",
          "backbone.wreqr":       "../bower_components/backbone.wreqr/lib/amd/backbone.wreqr",
          "backbone.syphon":      "../bower_components/backbone.syphon/lib/amd/backbone.syphon",
          marionette:             "../bower_components/marionette/lib/core/amd/backbone.marionette",
          moment:                 "../bower_components/moment/moment",
          globalize:              "../bower_components/globalize/lib/globalize",
          text:                   "../bower_components/requirejs-text/text",
          d3:                     "../bower_components/d3/d3",
          swf:                    "../bower_components/swfobject-amd/swfobject",
          spin:                   "../bower_components/spin.js/spin",
          jqueryspin:             "../bower_components/spin.js/jquery.spin",
          bootstrap:              "../bower_components/bootstrap/dist/js/bootstrap"

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
  'images',
  'html', 
  //'requirejsBuild',
  'clean',
  'watch']);
 
gulp.task('watch', function() {

    
  gulp.watch('App/*.html', ['html']);
  // Watch .scss files
  gulp.watch('Engine/scss/app.scss', ['styles']);
  // Watch .coffee files
  gulp.watch('Engine/js/app.coffee', ['coffee']);
  // Build Requirejs
  gulp.watch('Engine/js/app.js', ['requirejsBuild']);
  // Watch image files
  gulp.watch('App/images/**/*', ['images']);
  

});