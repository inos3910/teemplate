import { globs, paths } from '../config';
import gulp from 'gulp';
import path from 'path';
import fs from 'fs';
import through from 'through2';
import plumber from 'gulp-plumber'; //エラーでgulpが終了するのを止める
import notify from 'gulp-notify'; //デスクトップ通知
import diff from 'gulp-diff-build';
import named from 'vinyl-named'; //webpackでファイル結合時に名前変更
import gulpif from 'gulp-if';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from '../webpack.config';
import browserSync from 'browser-sync';
import del from 'del'; //ファイル削除

//出力済みファイルを削除
function deleteJsDistDir(done) {
  return del([paths.jsDistDir], done);
}
exports.deleteJsDistDir = deleteJsDistDir;

//処理中のファイル名を入れる
let proccessings = [];

//jsのエントリーポイントファイルかどうか
const isEntryFile = (file) => {
  let isEf = true;
  if (!isExistFile(file.path)) {
    isEf = false;
  } else {
    isEf = path.basename(file.path) === paths.jsEntryFileName;
  }
  return isEf;
};

//ファイルの存在チェック
const isExistFile = (file) => {
  try {
    fs.statSync(file);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') return false;
  }
};

//bundleされたファイルのみを次の処理に通す
const passThroughBundled = () => {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
    } else {
      const basename = path.basename(file.path);
      const isBundled = basename.indexOf('bundle.js') !== -1;
      if (isBundled) {
        this.push(file);
      }
      cb();
    }
  });
};

function buildJs() {
  return (
    gulp.src(globs.js, {
      allowEmpty: true,
    })
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>'),
    }))
    .pipe(diff())
    .pipe(named((file) => {
      return file.relative ? path.parse(file.relative).dir : 'code';
    }))
    .pipe(gulpif(isEntryFile, webpackStream(webpackConfig, webpack)))
    .pipe(passThroughBundled())
    .pipe(gulp.dest(paths.jsDistDir))
    .pipe(notify('buildJs finished'))
    .pipe(browserSync.reload({
      stream: true}))
    );
}
exports.buildJs = buildJs;

function buildJsAll() {
  return gulp
  .src(globs.entry, {
    allowEmpty: true,
  })
  .pipe(
    plumber({
      errorHandler: notify.onError('<%= error.message %>'),
    })
    )
  .pipe(
    named((file) => {
      return file.relative ? path.parse(file.relative).dir : 'code';
    })
    )
  .pipe(gulpif(isEntryFile, webpackStream(webpackConfig, webpack)))
  .pipe(gulp.dest(paths.jsDistDir))
  .pipe(notify('build:js-all finished'))
  .pipe(
    browserSync.reload({
      stream: true,
    })
    );
}
exports.buildJsAll = buildJsAll;
