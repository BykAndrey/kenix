var gulp = require("gulp"),
	sass = require("gulp-sass"),
	pug = require("gulp-pug"),
	//pref =require('autoprefixer'),
	browserSync = require("browser-sync");

/**
 * PostCss
 *
 */
var postcss = require("gulp-postcss"),
	cssnext = require("postcss-cssnext"),
	autoprefixer = require("autoprefixer"),
	precss = require("precss"),
	concat = require("gulp-concat"),
	sourcemaps = require("gulp-sourcemaps"),
	babel = require("gulp-babel"),
	imagemin = require("gulp-imagemin"),
	cssnano = require("cssnano");
var preproc = [
	precss,
	cssnext({
		features: {
			autoprefixer: {
				grid: true,
				browsers: ["last 50 versions", "ie 6-8", "Firefox > 20"]
			}
		}
	}),
	cssnano({
		preset: "default"
	})
];

gulp.task("globalcss", () => {
	return gulp
		.src(["./app/preproc/*.scss"])
		.pipe(sass().on("error", sass.logError))
		.pipe(sourcemaps.init())
		.pipe(postcss(preproc))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("./app/css"))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task("css-plugins", function() {
	return gulp
		.src([
			///"./node_modules/bootstrap-4-grid/css/grid.min.css",
			//"./node_modules/fullpage.js/dist/fullpage.min.css",

			"./node_modules/magnific-popup/dist/magnific-popup.css",
			"./node_modules/slick-carousel/slick/slick.css",
			"./node_modules/slick-carousel/slick/slick-theme.css"
		])

		.pipe(concat("plugins.css"))
		.pipe(sass().on("error", sass.logError))
		.pipe(sourcemaps.init())
		.pipe(postcss(preproc))
		.pipe(gulp.dest("./app/css/"));
});
gulp.task("js-plug", () => {
	return gulp
		.src([
			"./node_modules/jquery/dist/jquery.min.js",
			//"https://cdnjs.cloudflare.com/ajax/libs/pagePiling.js/1.5.6/jquery.pagepiling.min.js",
			"./node_modules/slick-carousel/slick/slick.min.js",
			"./node_modules/magnific-popup/dist/jquery.magnific-popup.min.js",
			"./app/js/onepage-scroll.js",
			"./app/js/jq.touch.min.js",
			"./app/js/loadimg.js",
			"./app/js/youtube.js",

			"./app/js/objectfit.js"
			//"./app/js/parallax.min.js"
		])
		.pipe(concat("plugins.js"))
		.pipe(gulp.dest("./app/js/"));
});
gulp.task("js-index", () => {
	return gulp
		.src(["./app/js/map.js", "./app/js/interface.js"])
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ["@babel/env"]
			})
		)
		.pipe(concat("index.js"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("./app/js/"));
});
gulp.task("pug", function() {
	return gulp
		.src("./app/pug/*.pug")
		.pipe(
			pug({
				pretty: true
			})
		)
		.pipe(gulp.dest("./app"));
});

gulp.task("images", () => {
	return gulp
		.src([
			"./app/img/**/*.png",
			"./app/img/**/*.jpg",
			"./app/img/**/*.svg",
			"./app/img/**/*.gif"
		])
		.pipe(imagemin())
		.pipe(gulp.dest("./dest/img/"));
});
gulp.task("fonts", () => {
	return gulp.src(["./app/fonts/**/*.*"]).pipe(gulp.dest("./dest/fonts/"));
});
gulp.task("css", () => {
	return gulp
		.src([
			"./app/css/style.css",
			"./app/css/style-media.css",
			"./app/css/plugins.css"
		])
		.pipe(gulp.dest("./dest/css/"));
});
gulp.task("js", () => {
	return gulp
		.src(["./app/js/index.js", "./app/js/plugins.js"])
		.pipe(gulp.dest("./dest/js/"));
});
gulp.task("html", () => {
	return gulp.src(["./app/*.html"]).pipe(gulp.dest("./dest/"));
});
gulp.task(
	"serve",
	["globalcss", "js-plug", "js-index", "pug", "css-plugins"],
	function() {
		browserSync.init({
			server: "./app"
		});
		gulp.watch("./app/img/**/*.*", ["images"]);
		gulp.watch("./app/fonts/**/*.*", ["fonts"]);
		gulp.watch("./app/js/*.js", ["js-plug"]);
		gulp.watch("./app/js/*.js", ["js-index"]);
		gulp.watch("./app/preproc/*.scss", ["globalcss"]);
		gulp.watch("./app/**/*.pug", ["pug"]);
		gulp.watch("./app/*.html").on("change", browserSync.reload);
	}
);

gulp.task(
	"build-task",
	[
		"globalcss",
		"js-plug",
		"js-index",
		"pug",
		"css-plugins",
		"images",
		"fonts",
		"css",
		"js",
		"html"
	],
	function() {}
);

gulp.task("default", ["serve"]);
gulp.task("build", ["build-task"]);
