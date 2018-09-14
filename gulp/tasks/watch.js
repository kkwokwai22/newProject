const gulp = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

gulp.task('watch', function() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: './'
		}
	});

	watch('./index.html', function() {
		// whenever we save some changes to index we will reload the file
		browserSync.reload();
	});

	watch('./assets/styles/**/*.css', function() {
		gulp.start('cssInject');
		console.log('updated CSS file');
	});
});

// this is for CSS

// What happen is whenever we make a change to CSS before running the
// cssInject task (which will refresh page or read css)
// it needs to run the ['styles'] task first and then continue on
gulp.task('cssInject', ['styles'], function() {
	return gulp.src('./temp/styles/style.css').pipe(browserSync.stream());
});
