var gulp 		= require('gulp'),

	plugins  	= require('gulp-load-plugins')(),
	server 		= require('tiny-lr')(),
	path    	= require('path'),
  connect = require('gulp-connect'),
  gulpif = require('gulp-if');


var conf = {
	css: 'App/css',
	scss: 'Engine/scss',
	sass: 'Engine/scss',
	sassStyle: 'expanded',
	img: 'App/img',
	js: 'App/js',
	coffee: 'Engine/coffee',
  styles: [
    'Engine/scss/*.scss'
  ],
  scripts: [
    'Engine/lib/json2.js',
    'Engine/lib/jquery.js',
    'Engine/lib/underscore.js',
    'Engine/lib/backbone.js',
    'Engine/lib/backbone.marionette.js',
    'Engine/lib/handlebars.js',
    'Engine/lib/marionette.handlebars.js',
    'Engine/Modules/ContentManager/*.coffee',
    'Engine/coffee/*.coffee',
  ]

};
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
 
gulp.task('scripts', function() {
  return gulp.src(conf.scripts)
    //.pipe(gulp.dest(conf.js))
    .pipe(gulpif(/[.]coffee$/, plugins.coffee({bare: true}))
      .on('error',plugins.util.log))
    //.pipe(gulp.dest(conf.js))
    .pipe(plugins.concat('app.js'))
    //.pipe(gulp.dest(conf.js))
    //.pipe(plugins.rename({suffix: '.min'}))
    //.pipe(plugins.uglify({outSourceMap: true, preserveComments: 'some'}))
    .pipe(gulp.dest(conf.js))
    .pipe(connect.reload())
    .pipe(plugins.notify({ message: 'Scripts task complete' }));
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
gulp.task('connect', function() {
  plugins.connect.server({
    root: 'App',
    livereload: true
  });
});
gulp.task('html', function () {

  gulp.src('App/*.html')
    .pipe(connect.reload());
});
gulp.task('default', ['connect','styles', 'scripts', 'images','html', 'clean','watch']);
 
gulp.task('watch', function() {

    
  gulp.watch('App/*.html', ['html']);
  // Watch .scss files
  gulp.watch('Engine/scss/*.scss', ['styles']);
  // Watch .js files
  gulp.watch('Engine/coffee/*.coffee', ['scripts']);
  // Watch image files
  gulp.watch('App/images/**/*', ['images']);
  

});