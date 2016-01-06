var gulp = require('gulp');
var browserify = require('gulp-browserify');
var babel = require('babelify');
var rename = require('gulp-rename');
var notifier = require('node-notifier');
var gutil = require("gulp-util");
var paths = {
 scripts: 'js/'
}

// Basic usage
gulp.task('scripts', function() {
	// Single entry point to browserify
	gulp.src(paths.scripts+"app.js")
		.pipe(browserify({
		  insertGlobals : true,
		  debug : !gulp.env.production,
      transform: babel
		}))
    .on("error", notify)
    .pipe(rename("app.min.js"))
		.pipe(gulp.dest('./'))
});

gulp.task('compile', ['scripts']);

gulp.task('watch', ['scripts'], function(){
  gulp.watch(paths.scripts+"/**/*", ['scripts']);
});


// System notifier
function notify(err){
				var message;
        gutil.log(err);
        if( !err ){
            return;
        }

				message = err.message.split('/');
				message.splice(0, message.length -3);

				notifier.notify({
					title : err.plugin+": Error",
					message:  message.join('/'),
					sound: true
				});

		    this.end && this.end();
}
