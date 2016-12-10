'use strict';

var gulp = require('gulp'),
	handlebars = require('gulp-compile-handlebars'),
	rename = require('gulp-rename'),
	glob = require('glob'),
	filter = require('gulp-filter'),
	browserSync = require('browser-sync').create(),
	assets = require('postcss-assets'),
	concat = require('gulp-concat'),
	nested = require('postcss-nested'),
	postcss = require('gulp-postcss'),
	sass = require('gulp-sass'),
	autoprefixer = require('autoprefixer'),
	cssShort = require('postcss-short'),
	cssnano = require('cssnano'),
	sourcemaps = require('gulp-sourcemaps'),
	stylelint = require('stylelint'),
	uglify = require('gulp-uglify'),
	gulpIf = require('gulp-if'),
	useref = require('gulp-useref'),
	plumber = require('gulp-plumber'),
	runSequence = require('run-sequence'),
	reporter = require('postcss-reporter'),
	eslint = require('gulp-eslint'),
	del = require('del'),
	config = require('./config'),
	rulesStyles = require('./stylelintrc.json'),
	rulesScripts = require('./eslintrc.json'),
	templateContext = require('./app/src/data.json'),

	paths = {
		appDir: './app',
		buildDir: './build',

		watchDir: ['./app/**/*', '!./app/bower_components/**/*'],

		templates: './app/src/handlebars/templates/**/*.hbs',
		handlebars: ['./app/src/handlebars/*.hbs'],

		appScss: ['./app/src/scss/*.scss'],
		watchSass: ['./app/src/scss/**/*.scss'],
		appCss: ['./app/css'],
		buildCss: ['./build/css'],

		appJs: ['./app/js/**/*.js'],
		buildJs: ['./build/js'],

		scriptsLint: ['**/*.js', '!node_modules/**/*', '!app/bower_components/**/*', '!build/**/*', '!prebuild/**/*'],
		assets: 'app/assets/**/*.{png,svg,jpg}',
		others: ['./app/php/*.php']
		contextJson: 'app/src/data.json'
	},

	sassOptions = {
		errLogToConsole: true,
		outputStyle: 'expanded'
	};

var processors = [
	assets,
	nested,
	cssShort,
	autoprefixer({
		browsers: ['last 10 version'],
		cascade: false
	})];
if (config.env === 'prod') {
	processors.push(cssnano)
};

switch (config.env) {
case 'dev':
	gulp.task('default', [
		'compile',
		'styles',
		'watch',
		'browser-sync'
	]);
	break;
case 'prod':
	gulp.task('default', function (callback) {
		runSequence(
			'clean:build',
				['compile', 'styles', 'assets', 'fonts'],
			'useref',
			'clean:app',
			callback
		)
	});
	break;
default:
	break;
};

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: './app'
		}
	});
});

gulp.task('compile', function () {
	glob(paths.templates, function (err, files) {
		if (!err) {
			var templatesDir = files.map(function (item) {
				return item.slice(0, item.lastIndexOf('/'));
			});
			var options = {
				ignorePartials: true,
				batch: templatesDir,
				helpers: {
					capitals: function capitals(str) {
						return str.toUpperCase();
					}
				}
			};

			gulp.src(paths.handlebars)
				.pipe(handlebars(templateContext, options))
				.pipe(rename({
					extname: ".html"
				}))
				.pipe(gulp.dest('' + paths.appDir))
		} else {
			throw err;
		}
	});
});

//==================================

gulp.task('styles', function () {
	return gulp.src(paths.appScss)
		.pipe(sass(sassOptions))
		.pipe(postcss(processors))
	.pipe(gulp.dest('' + paths.appCss))
        .pipe(browserSync.stream());
});

//==================================

// Optimizing CSS and JavaScript
gulp.task('useref', function () {
	return gulp.src('./app/*.html')
		.pipe(plumber())
			.pipe(useref())
			.pipe(gulpIf('*.js', uglify()))
		.pipe(plumber.stop())
	.pipe(gulp.dest('' + paths.buildDir))
});

//==================================

gulp.task('fonts', function () {
	return gulp.src('./app/fonts/**/*')
		.pipe(filter(['*.woff', '*.woff2']))
	.pipe(gulp.dest(paths.buildDir + '/fonts'))
});

//==================================

gulp.task('assets', function () {
	glob(paths.assets, function (err, files) {
		if (!err) {
			gulp.src(files)
				.pipe(gulp.dest(paths.buildDir + '/assets'));
		} else {
			throw err;
		}
	});
});

gulp.task('copies', function () {
	return gulp.src(paths.others)
	.pipe(gulp.dest('' + paths.buildDir))
})

gulp.task('clean:app', function () {
	del.sync(['./app/*.html', './app/css/**/*.+(css|map)']);
});

gulp.task('clean:build', function () {
	del.sync(['./build/**/*', '!./build/assets', '!./build/assets/**/*']);
});

gulp.task('watch', function () {
	gulp.watch(paths.handlebars, ['compile']);
	gulp.watch(paths.watchSass, ['styles']);
	gulp.watch(paths.contextJson)
		.on('change', browserSync.reload);
	gulp.watch(paths.watchDir)
		.on('change', browserSync.reload);
});
