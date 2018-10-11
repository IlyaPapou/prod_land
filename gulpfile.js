const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('scss', () =>
  gulp
    .src('dev/scss/**/*.scss')
    .pipe(sass())
    .pipe(
      autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        cascade: true,
      })
    )
    .pipe(cssnano())
    .pipe(gulp.dest('./public/css'))
);

gulp.task('js', () =>
  gulp
    .src('./dev/js/**/*.js')
    .pipe(concat('index.js'))
    .pipe(uglify('index.js'))
    .pipe(gulp.dest('./public/js'))
);

gulp.task('default', ['scss', 'js'], () => {
  gulp.watch('dev/scss/**/*.scss', ['scss']);
  gulp.watch('dev/js/**/*.js', ['js']);
});
