const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const watchify = require('watchify');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');


const browserifyOpts = (entries, debug) => ({
  entries,
  debug,
  standalone: 'Star'
});
const destinationPath = '../../public/compiled/';
const destination = () => gulp.dest(destinationPath);
const fileBaseName = 'star.site';

const prodSource = () => browserify(browserifyOpts('src/index.js', false))
      .transform('babelify',
                 { presets: ['@babel/preset-env'] })
      .bundle()
      .pipe(source(`${fileBaseName}.source.min.js`))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('./dist'));

const devSource = () => browserify(browserifyOpts('src/index.js', true))
      .transform('babelify',
                 { presets: ['@babel/preset-env'] })
      .bundle()
      .pipe(source(`${fileBaseName}.js`))
      .pipe(destination());

function makeDependencies(filename) {
  return function bundleDeps() {
    return gulp.src([
      '../../public/javascripts/vendor/jquery.min.js'
    ]).pipe(concat(filename))
      .pipe(destination());
  };
}

const deps = makeDependencies('star.deps.js');

const tasks = [deps];

const dev = gulp.series(tasks.concat([devSource]));

gulp.task('dev', gulp.series(tasks, dev));
gulp.task('default', gulp.series(tasks, dev, () => gulp.watch('src/**/*.js', dev)));
