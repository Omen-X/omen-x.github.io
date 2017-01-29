'use strict';

import gulp            from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import bs              from 'browser-sync';
import del             from 'del';
import pngquant        from 'imagemin-pngquant';
import bourbon         from 'node-bourbon';

const $ = gulpLoadPlugins();

	// gulp plugins list
gulp.task('pl', () => console.log($));


// ========>> SOURCES <<========

const SOURCES = {
	jsLibs: [
	'src/libs/jquery/dist/jquery.min.js',
	],
	sassLibs: [
	]
};


// ========>> LIVERELOAD <<========

gulp.task('browser-sync', () => {
	bs({
		server: {
			baseDir: 'src'
		},
		browser: 'firefox',
		notify: false
	});
});


// ========>> HTML <<========

gulp.task('nunjucks', () => {
	return gulp.src('src/pages/**/*.+(html|njk)')
	.pipe($.nunjucksRender({
		path: ['src/templates']
	}))
	.pipe(gulp.dest('src'))
	.pipe(bs.reload({stream: true}))
});

gulp.task('html', () => {
	gulp.src(['src/*.html'])
	.pipe($.fileInclude({
		prefix: '@@',
	}))
	.pipe($.removeHtml())
	.pipe(gulp.dest('dist/'))
	.pipe($.htmlmin({collapseWhitespace: true}))
	.pipe($.rename({suffix: '.min', prefix : ''}))
	.pipe(gulp.dest('dist/'))
});


// ========>> CSS <<========

gulp.task('sass-glob', () => {
	return gulp.src('src/sass/components/_blocks.sass')
	.pipe($.sassGlob())
	.pipe(gulp.dest('src/sass/components'));
});

gulp.task('sass', ['sass-glob'], () => {
	return gulp.src(['src/sass/libs.sass', 'src/sass/main.sass', 'src/sass/media.sass'])
	.pipe($.sass({
		includePaths: bourbon.includePaths
	}).on('error', $.sass.logError))
	.pipe($.autoprefixer(['last 3 versions']))
	.pipe(gulp.dest('src/css'))
	.pipe($.concat('main.min.css'))
	.pipe($.cleanCss())
	.pipe(gulp.dest('src/css'))
	.pipe(bs.reload({stream: true}))
});


// ========>> JS <<========

gulp.task('libs-js', () => {
	return gulp.src(SOURCES.jsLibs)
	.pipe($.concat('libs.min.js'))
	.pipe($.uglify())
	.pipe(gulp.dest('src/js'))
	.pipe(bs.reload({stream: true}))
});

gulp.task('js', () => {
	return gulp.src('src/js/dev/*.js')
	.pipe($.babel())
	.pipe(gulp.dest('src/js'))
	.pipe($.uglify())
	.pipe($.rename({suffix: '.min', prefix : ''}))
	.pipe(gulp.dest('src/js'))
	.pipe(bs.reload({stream: true}))
});


// ========>> WATCH <<========

gulp.task('watch', ['sass', 'libs-js', 'browser-sync', 'nunjucks', 'js'],() => {
	gulp.watch('src/sass/**/*.{sass,scss}', ['sass']);
	gulp.watch('src/templates/**/*.+(html|njk)', ['nunjucks']);
	gulp.watch('src/pages/**/*.+(html|njk)', ['nunjucks']);
	gulp.watch('src/*.html', bs.reload);
	gulp.watch('src/js/dev/**/*.js', ['js']);
	gulp.watch([SOURCES.jsLibs, 'src/libs/*' ], ['libs-js']);
	gulp.watch(SOURCES.sassLibs, ['sass']);
});


// ========>> IMAGE <<========

gulp.task('imgBuild', () => {
	return gulp.src('src/img/**/*')
	.pipe($.cache($.imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe($.rename((name) => {
		name.basename = name.basename.replace(/-min/, '');
		return name;
	}))
	.pipe(gulp.dest('dist/img')); 
});


// ========>> BUILD <<========

gulp.task('removedist', () => { return del.sync('dist'); });

gulp.task('build', ['removedist', 'html', 'imgBuild', 'sass', 'js', 'libs-js'], () => {

	var buildCssMin = gulp.src('src/css/main.min.css').pipe(gulp.dest('dist/css'));

	var buildCssMain = gulp.src([
		'src/css/main.css',
		'src/css/media.css'
		]).pipe($.concat('main.css')).pipe(gulp.dest('dist/css'));

	var buildCssLibs = gulp.src('src/css/libs.css')
									.pipe($.cleanCss())
									.pipe($.rename({suffix: '.min', prefix : ''}))
									.pipe(gulp.dest('dist/css'));

	var buildFiles = gulp.src([
		'src/ht.access'
		]).pipe(gulp.dest('dist'));

	var buildFonts = gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('src/js/*.js').pipe(gulp.dest('dist/js'));

});


// ========>> DEFAULT <<========

gulp.task('clearcache', () => { return $.cache.clearAll(); });

gulp.task('default', ['watch']);



