const Fiber = require('fibers');
const { series, parallel, src, dest, watch } = require('gulp');
let sass = require('gulp-sass');
sass.compiler = require('sass');
//const Terser = require('terser');
const terser = require('gulp-terser');

let css_out = __dirname + "/css";
let js_out = __dirname + "/js";

// gulp.task('sass', function () {

// });

// gulp.task('sass:watch', function () {
// 	gulp.watch('./source/scss/**/*.scss', ['sass']);
// });


function javascriptProd(cb) {
	src('./source/js/index.js')
		.pipe(terser({}))
		.pipe(dest(js_out));
	cb();
}

function javascriptDev(cb) {
	src('./source/js/index.js')
		.pipe(terser({ compress: false, mangle: false, format: { beautify: true } }))
		.pipe(dest(js_out));
	cb();
}

function cssProd(cb) {
	src('./source/scss/**/*.scss')
		.pipe(sass.sync({ outputStyle: 'compressed', fiber: Fiber }).on('error', sass.logError))
		.pipe(dest(css_out));
	cb();
}
function cssDev(cb) {
	src('./source/scss/**/*.scss')
		.pipe(sass.sync({ outputStyle: 'expanded', fiber: Fiber }).on('error', sass.logError))
		.pipe(dest(css_out));
	cb();
}

exports.buildProd = parallel(javascriptProd, cssProd);
exports.buildDev = parallel(javascriptDev, cssDev);

