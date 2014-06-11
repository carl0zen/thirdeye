var gulp 		= require('gulp'),
	plugins  	= require('gulp-load-plugins')(),
	server 		= require('tiny-lr')(),
	path    	= require('path');


var gulpConf = {
	css: 'App/css',
	scss: 'Engine/scss',
	sass: 'Engine/scss',
	sassStyle: 'expanded',
	img: 'App/img',
	js: 'App/js',
	coffee: 'Engine/coffee'

};
gulp.task('styles', function(){
  return gulp.src('Engine/scss/*.scss')
    .pipe(plugins.compass({
      style: gulpConf.sassStyle,
      css: gulpConf.css,
      sass: gulpConf.sass,
      image: gulpConf.img,

    }))
    .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(gulpConf.css))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(gulpConf.css))
    .pipe(plugins.livereload(server))
    .pipe(plugins.notify({message: 'Styles task complete'}));
});
 
gulp.task('scripts', function() {
  return gulp.src('Engine/coffee/*.coffee')
    .pipe(gulp.dest(gulpConf.js))
    .pipe(plugins.coffee({bare: true, sourceMap: true}))
    .pipe(gulp.dest(gulpConf.js))
    .pipe(plugins.concat('main.js'))
    .pipe(gulp.dest(gulpConf.js))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.uglify({outSourceMap: true, preserveComments: 'some'}))
    .pipe(gulp.dest(gulpConf.js))
    .pipe(plugins.livereload(server))
    .pipe(plugins.notify({ message: 'Scripts task complete' }));
});
 
gulp.task('images', function() {
  return gulp.src('Assets/img/**/*')
    .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('App/img'))
    .pipe(plugins.livereload(server))
    .pipe(plugins.notify({ message: 'Images task complete' }));
});
 
gulp.task('clean', function() {
  return gulp.src([gulpConf.css, gulpConf.js, gulpConf.img], {read: false})
    .pipe(plugins.clean());
});
 
gulp.task('default', function() {
  gulp.start('styles', 'scripts', 'images');
});
 
gulp.task('watch', function() {
    
    // Watch .scss files
    gulp.watch('Engine/scss/**/*.scss', ['styles']);
    // Watch .js files
    gulp.watch('Engine/coffee/**/*.coffee', ['scripts']);
    // Watch image files
    gulp.watch('App/images/**/*', ['images']);

    var server = livereload();
    // Listen on port 35729
    server.listen(35729, function (err) {
    if (err) {
      return console.log(err)
    };
    gulp.watch('App/*', function(e){
      server.changed(e.path);
    });
  });
});