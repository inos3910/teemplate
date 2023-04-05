import gulp from 'gulp';
import { globs, paths } from '../config.mjs';
//エラーでgulpが終了するのを止める
import plumber from 'gulp-plumber';
//デスクトップ通知
import notify from 'gulp-notify';
//webpackでファイル結合時に名前変更
import named from 'vinyl-named';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from '../webpack.config.mjs';
import { deleteSync } from 'del';
import path from 'path';

export const deleteTsDistDir = (done) => {
  deleteSync([paths.tsDistDir]);
  done();
};

export const buildTs = () => {
  return gulp
    .src(globs.ts, {
      allowEmpty: true,
      since: gulp.lastRun(buildTs),
    })
    .pipe(
      plumber({
        errorHandler: notify.onError('<%= error.message %>'),
      })
    )
    .pipe(
      named((file) => {
        return path.parse(file.relative).dir
          ? path.parse(file.relative).dir
          : 'main';
      })
    )
    .pipe(webpackStream(webpackConfig, webpack))
    .on('error', function (error) {
      this.emit('end');
    })
    .pipe(gulp.dest(paths.tsDistDir))
    .pipe(notify('buildTs finished'));
};
