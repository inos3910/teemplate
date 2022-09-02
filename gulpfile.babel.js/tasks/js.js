import gulp from 'gulp';
import { globs, paths } from '../config';
import plumber from 'gulp-plumber'; //エラーでgulpが終了するのを止める
import notify from 'gulp-notify'; //デスクトップ通知
import path from 'path';
import diff from 'gulp-diff-build';
import gulpif from 'gulp-if';
import browserSync from 'browser-sync';
import gulpEsbuild from 'gulp-esbuild';
import rename from 'gulp-rename';
import glob from 'glob';
import del from 'del'; //ファイル削除

const is_production = process.env.NODE_ENV === 'production';

//出力済みファイルを削除
function deleteJsDistDir(done) {
  return del([paths.jsDistDir], done);
}
exports.deleteJsDistDir = deleteJsDistDir;

const esbuildConfig = {
  entryPoints: glob.sync(globs.entry),
  bundle     : true,
  minify     : is_production,
  target     : ['es2020'],
  platform   :'node',
  sourcemap  : !is_production
};

function buildJs() {
  let distFileName = 'code';

  return gulp.src(globs.entry, {
    allowEmpty: true,
  })
  .pipe(plumber({
    errorHandler: notify.onError('<%= error.message %>'),
  }))
  .pipe(diff())
  .pipe(gulpif((file) => {
    distFileName = file.relative ? path.parse(file.relative).dir : distFileName;
    return true;
  }, gulpEsbuild(esbuildConfig)))
  .pipe(rename((path) => {
    path.basename = `${distFileName}.bundle`;
  }))
  .pipe(gulp.dest(paths.jsDistDir))
  .pipe(notify('buildJs finished'))
  .pipe(browserSync.reload({
    stream: true,
  }));
}
exports.buildJs = buildJs;

function buildJsAll() {
  let distFileName = 'code';

  return gulp.src(globs.entry, {
    allowEmpty: true,
  })
  .pipe(plumber({
    errorHandler: notify.onError('<%= error.message %>'),
  }))
  .pipe(diff())
  .pipe(gulpif((file) => {
    distFileName = file.relative ? path.parse(file.relative).dir : distFileName;
    return true;
  }, gulpEsbuild(esbuildConfig)))
  .pipe(rename((path) => {
    path.basename = `${distFileName}.bundle`;
  }))
  .pipe(gulp.dest(paths.jsDistDir))
  .pipe(notify('buildJsAll finished'))
  .pipe(browserSync.reload({
    stream: true,
  }));
}
exports.buildJsAll = buildJsAll;
