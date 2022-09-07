import { globs, paths } from '../config';
import gulp from 'gulp';
import path from 'path';
import glob from 'glob';
import del from 'del'; //ファイル削除
import browserSync from 'browser-sync';

import plumber from 'gulp-plumber'; //エラーでgulpが終了するのを止める
import notify from 'gulp-notify'; //デスクトップ通知
// import diff from 'gulp-diff-build';
import gulpif from 'gulp-if';
import gulpEsbuild from 'gulp-esbuild';
import rename from 'gulp-rename';

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
  target     : ['es2019'],
  platform   :'node',
  sourcemap  : !is_production,
  outbase    : paths.jsSrcDir,
  outdir     : 'dist'
};

function buildJs() {
  let distFileName = 'app';
  return gulp.src(globs.entry, {
    allowEmpty: true,
  })
  .pipe(plumber({
    errorHandler: notify.onError('<%= error.message %>'),
  }))
  .pipe(gulpif((file) => {
    distFileName = file.relative ? path.parse(file.relative).dir : distFileName;
    return true;
  }, gulpEsbuild(esbuildConfig)))
  .pipe(rename((path) => {
    path.basename = path.dirname && path.dirname !== '.' ? `${path.dirname}.bundle` : `${distFileName}.bundle`;
    path.dirname  = '';
  }))
  .pipe(gulp.dest(paths.jsDistDir))
  .pipe(notify('buildJs finished'))
  .pipe(browserSync.reload({
    stream: true,
  }));
}
exports.buildJs = buildJs;

function buildJsAll() {
  // let distFileName = 'app';

  return gulp.src(globs.entry, {
    allowEmpty: true,
  })
  .pipe(plumber({
    errorHandler: notify.onError('<%= error.message %>'),
  }))
  // .pipe(gulpif((file) => {
  //   distFileName = file.relative ? path.parse(file.relative).dir : distFileName;
  //   return true;
  // }, gulpEsbuild(esbuildConfig)))
  .pipe(gulpEsbuild(esbuildConfig))
  // .pipe(rename((path) => {
  //   console.log(distFileName);
  //   path.basename = path.dirname && path.dirname !== '.' ? `${path.dirname}.bundle` : `${distFileName}.bundle`;
  //   path.dirname  = '';
  // }))
  .pipe(gulp.dest(paths.assetsDir))
  .pipe(notify('buildJsAll finished'))
  .pipe(browserSync.reload({
    stream: true,
  }));
}
exports.buildJsAll = buildJsAll;
