const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");

gulp.task("scss", () =>
  gulp
    .src("dev/scss/**/*.scss")
    .pipe(sass())
    .pipe(
      autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
        cascade: false
      })
    )
    .pipe(cssnano())
    .pipe(gulp.dest("./public/css"))
);

gulp.task("js", () =>
  gulp
    .src("./dev/js/index.js")
    //.pipe(concat('index.js'))
    .pipe(uglify("index.js"))
    .pipe(gulp.dest("./public/js"))
);

gulp.task("unitegallery", () =>
  gulp
    .src(["./dev/js/ug-theme-tiles.js", "./dev/js/unitegallery.js"])
    .pipe(concat("unitegallery.js"))
    .pipe(uglify("unitegallery.js"))
    .pipe(gulp.dest("./public/js"))
);

gulp.task("default", ["scss", "js", "unitegallery"], () => {
  gulp.watch("dev/scss/**/*.scss", ["scss"]);
  gulp.watch("dev/js/index.js", ["js"]);
  gulp.watch(["./dev/js/ug-theme-tiles.js", "./dev/js/unitegallery.js"], ["unitegallery"]);
});
