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

gulp.task('test', function()
{
	gulp.src(['./**/**.js', './**/**.html', '!./node_modules/**', '!bower_components/**'])
	.pipe(plumber())
	.pipe(decomment())
	.pipe(gulp.dest('./test'))
});

gulp.task('html_strip', function()
{
	var src = './build/**/**/*.html';
	gulp.src(src)
	.pipe(plumber())
	.pipe(decomment())
	.pipe(gulp.dest('./build'))
});

gulp.task('js_strip', function()
{
	var src = './build/**/**/*.js';
	gulp.src(src)
	.pipe(plumber())
	.pipe(decomment())
	.pipe(stripDebug())
	.pipe(gulp.dest('./build'))
});

gulp.task('css_strip', function()
{
	var src = './build/**/**/*.css';
	gulp.src(src)
	.pipe(plumber())
	.pipe(stripCssComments())
	.pipe(gulp.dest('./build'))
});

gulp.task('git_build', ['html_strip', 'js_strip', 'css_strip']);

gulp.task('compass', function()
{
	gulp.src('client/scss/style_test.scss')
	.pipe(plumber())
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

gulp.task('browser-sync', function()
{
	browserSync.init(null,
	{
		proxy: 'localhost:3000'
	});
});

gulp.task('build:cleanfolder', function(cb)
{
	del([
			'./build/'
		], cb());
});

gulp.task('build:copy', ['build:cleanfolder'], function()
{
	return gulp.src(['./**/*/'])
	.pipe(gulp.dest('./build/'));

	});

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
	var htm = './build/**/**/*.html';
	gulp.src(htm)
	.pipe(plumber())
	.pipe(decomment())
	.pipe(gulp.dest('./build'))

	var js = './build/**/**/*.js';
	gulp.src(js)
	.pipe(plumber())
	.pipe(decomment())
	.pipe(stripDebug())
	.pipe(gulp.dest('./build'))

	var css = './build/**/**/*.css';
	gulp.src(css)
	.pipe(plumber())
	.pipe(stripCssComments())
	.pipe(gulp.dest('./build'))	
});

gulp.task('build', ['build:remove','build:strip']);

gulp.task('build:serve', function()
{
	browserSync.init(null,
	{
		server:
		{
			baseDir: "./build/client"
		},
	});
});



gulp.task('watch', function()
{
	gulp.watch('server/**/**.js', ['scripts']);
	gulp.watch('client/scss/style_test.scss', ['compass']);
	gulp.watch('client/**/*.html', ['html']);
	gulp.watch('client/**/*.js', ['js']);
});


gulp.task('default', ['compass', 'browser-sync', 'watch']);