//Task:imagemin
import gulp from 'gulp';
import { globs, paths } from '../config.js';
//エラーでgulpが終了するのを止める
import plumber from 'gulp-plumber';
//画像圧縮
import gulpImagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import mozjpeg from 'imagemin-mozjpeg';
//webp生成
import gulpWebp from 'gulp-webp';
import rename from 'gulp-rename';

//画像圧縮
function imagemin() {
  return gulp.src(globs.img, {
    allowEmpty : true,
    since      : gulp.lastRun(imagemin)
  })
  .pipe(plumber())
  .pipe(gulpImagemin([
    pngquant({
      quality : [.8, .9],
      speed   : 1,
      floyd   : 0
    }),
    mozjpeg({
      quality     : 85,
      progressive : true
    }),
    gulpImagemin.svgo(),
    gulpImagemin.optipng(),
    gulpImagemin.gifsicle()
    ])
  )
  .pipe(gulpImagemin())
  .pipe(gulp.dest(paths.imageminDir));
}
exports.imagemin = imagemin;

//WebPへ変換
function webp() {
  return gulp
  .src(globs.toWebp,{
    allowEmpty : true,
    since      : gulp.lastRun(webp)
  })
  .pipe(rename((path) => {
    path.basename += path.extname;
  }))
  .pipe(gulpWebp())
  .pipe(gulp.dest(paths.imageDir));
}
exports.webp = webp;
