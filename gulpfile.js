// Dependencies
var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	compass = require('gulp-compass'),
	browserSync = require('browser-sync');
	del = require('del'),
	decomment = require('gulp-decomment'),
	stripCssComments = require('gulp-strip-css-comments'),
	stripDebug = require('gulp-strip-debug'),
	reload = browserSync.reload;

// Scripts
gulp.task('test', function()
{
	// pick all the files you want to do something to
	// these are all the js files in client/wtv and skipping the min files
	// gulp.src(['client/**/*.js','!client/**/*.min.js'])
	gulp.src(['./**/**.js', './**/**.html', '!./node_modules/**', '!bower_components/**'])
	.pipe(plumber())
	.pipe(decomment())
	// pipe them through the renaming module that will append a .min suffix
	// cd.pipe(rename({suffix: '.min'}))
	// pipe it to the minifying module
	// .pipe(uglify())
	// pipe all the copies of the modified files to their final destination folder
	.pipe(gulp.dest('./test'))
	// .pipe(reload({stream:true}));
	// gulp.source('*.+(js|css)');	//all files in the root directory ending in .js or .css
});

// cleanup tasks
// Decommenting html
gulp.task('html_strip', function()
{
	// var src = ['./**/**/*.html', '!./node_modules/**', '!bower_components/**'];
	var src = './build/**/**/*.html';
	gulp.src(src)
	.pipe(plumber())
	.pipe(decomment())
	.pipe(gulp.dest('./build'))
});

// Decommenting js and removing logs
gulp.task('js_strip', function()
{
	// var src = ['./**/**/*.html', '!./node_modules/**', '!bower_components/**'];
	var src = './build/**/**/*.js';
	gulp.src(src)
	.pipe(plumber())
	.pipe(decomment())
	.pipe(stripDebug())
	.pipe(gulp.dest('./build'))
});

// Decommenting css
gulp.task('css_strip', function()
{
	// var src = ['./**/**/*.html', '!./node_modules/**', '!bower_components/**'];
	var src = './build/**/**/*.css';
	gulp.src(src)
	.pipe(plumber())
	.pipe(stripCssComments())
	.pipe(gulp.dest('./build'))
});

// make git-ready build folder
gulp.task('git_build', ['html_strip', 'js_strip', 'css_strip']);

// Style tasks Compass / SASS
gulp.task('compass', function()
{
	gulp.src('client/scss/style_test.scss')
	// pipe through plumber() to resolve problems down to the line of origin
	// plumber() should always be the first thing you pipe in
	.pipe(plumber())
	// pipe the scss file through the compass engine
	// to generate our endpoint css file and place it in 
	// the css folder.
	.pipe(compass(
	{
		config_file: './config.rb',
		css: 'client/css',
		sass: 'client/scss',
		require: ['susy']
	}))
	.pipe(autoprefixer('last 2 versions'))
	.pipe(gulp.dest('client/css/'))
	.pipe(reload({stream:true}));
});

gulp.task('html', function()
{
	gulp.src('client/**/*.html')
	.pipe(plumber())
	.pipe(reload({stream:true}));
});

gulp.task('js', function()
{
	gulp.src('client/**/**.js')
	.pipe(plumber())
	.pipe(reload({stream:true}));
});

// Browser-Sync task
gulp.task('browser-sync', function()
{
	browserSync.init(null,
	{
		// server:
		// {
		// 	baseDir: "./",
		// 	index: "client/index.html"
		// },
		proxy: 'localhost:3000'
	});
});

// Build tasks
// Task to remove all build directory files before replacing it with a new version
gulp.task('build:cleanfolder', function(cb)
{
	del([
			'./build/'
		], cb());
});

// Task to create directory for all files
// The middle arg tells this task that which task must be completed first
gulp.task('build:copy', ['build:cleanfolder'], function()
{
	return gulp.src(['./**/*/'])
	.pipe(gulp.dest('./build/'));
});

// Task to remove all files we don't want to include in our final build
// The middle arg tells this task that which task must be completed first
gulp.task('build:remove', ['build:copy'], function(cb)
{
	del([
			'build/client/scss/',
			'build/node_modules/',
			'build/bower_components/',
			'build/readme.docx',
			'build/client/img/',
			'build/client/jade/',
			'build/uploads/',
		], cb());
});

gulp.task('build:strip', function()
{
	// Decommenting html
	var htm = './build/**/**/*.html';
	gulp.src(htm)
	.pipe(plumber())
	.pipe(decomment())
	.pipe(gulp.dest('./build'))

	// Decommenting js and removing logs
	var js = './build/**/**/*.js';
	gulp.src(js)
	.pipe(plumber())
	.pipe(decomment())
	.pipe(stripDebug())
	.pipe(gulp.dest('./build'))

	// Decommenting css
	var css = './build/**/**/*.css';
	gulp.src(css)
	.pipe(plumber())
	.pipe(stripCssComments())
	.pipe(gulp.dest('./build'))	
});

gulp.task('build', ['build:copy', 'build:remove']);

// Browser-Sync task for when a build is made
gulp.task('build:serve', function()
{
	browserSync.init(null,
	{
		server:
		{
			baseDir: "./build/client"
		},
		// proxy: 'localhost:3000'
	});
});



// Watch tasks
gulp.task('watch', function()
{
	gulp.watch('server/**/**.js', ['scripts']);
	gulp.watch('client/scss/style_test.scss', ['compass']);
	gulp.watch('client/**/*.html', ['html']);
	gulp.watch('client/**/*.js', ['js']);
});


// default task - calls all your other tasks, executes when entering gulp
gulp.task('default', ['compass', 'browser-sync', 'watch']);