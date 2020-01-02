var gulp = require ('gulp'),
rename = require('gulp-rename'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
browserSync = require('browser-sync').create();

var paths = {
    styles: {
        src:"./pages/**/*.html",
        src: "./scss/*.scss",
        dest: "./css",
    },
    
    scripts: {
        src: 
        ["./node_modules/bootstrap/dist/js/**/*js", "./node_modules/jquery/dist/*js",],
        dest: "./js",
    }
    };

    function style() {
        return gulp
            .src(paths.styles.src)
            .pipe(sass())
            .pipe(sourcemaps.init())
            .pipe(sass({
                errorLogToConsole: true,
                outputStyle: 'compressed'
            }))
            .on("error", sass.logError)
            .pipe(rename({suffix: '.min'}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(browserSync.stream(reload));
        }

        function scripts() {
            return gulp
                .src(paths.scripts.src)
                .pipe(gulp.dest(paths.scripts.dest))
            }

            function reload() {
                browserSync.reload();
                
                }
                function watch() {
                browserSync.init({
                    server: {
                        baseDir: "./"
                    }
                });
                
                
                
                
                gulp.watch(paths.styles.src, style);
                gulp.watch("./pages/**/*.html").on('change', browserSync.reload);
                }
                exports.watch = watch
                exports.watch = scripts
                exports.style = style;
                var build = gulp.parallel(scripts, style, watch);
                gulp.task('default', build);