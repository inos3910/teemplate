//Task:imagemin
import gulp from 'gulp';
import { globs, paths } from '../config.js';
//エラーでgulpが終了するのを止める
import plumber from 'gulp-plumber';
//画像圧縮
import _imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import mozjpeg from 'imagemin-mozjpeg';
//CSSスプライト
import spritesmith from 'gulp.spritesmith';
//webp生成
import _webp from 'gulp-webp';
import rename from 'gulp-rename';

//画像圧縮
function imagemin() {
  return gulp.src(globs.img, {
    allowEmpty : true,
    since      : gulp.lastRun('imagemin')
  })
  .pipe(plumber())
  .pipe(_imagemin([
    pngquant({
      quality : [.8, .9],
      speed   : 1,
      floyd   : 0
    }),
    mozjpeg({
      quality     : 85,
      progressive : true
    }),
    _imagemin.svgo(),
    _imagemin.optipng(),
    _imagemin.gifsicle()
    ])
  )
  .pipe(_imagemin())
  .pipe(gulp.dest(paths.imageminDir));
}
exports.imagemin = imagemin;

//WebPへ変換
function webp() {
  let extension;
  const arr = {};
  return gulp
  .src(globs.img,{
    allowEmpty : true,
    since      : gulp.lastRun('webp')
  })
  .pipe(
    rename(path => {
      arr[`${path.dirname}${path.basename}`] = path.extname;
    })
    )
  .pipe(_webp())
  .pipe(
    rename(path => {
      if (path.extname === '.webp') {
        path.basename += arr[`${path.dirname}${path.basename}`];
      }
    })
    )
  .pipe(gulp.dest(paths.imageDir));
}
exports.webp = webp;

//CSSスプライト画像の生成
function sprite() {
  const spriteData = gulp.src(globs.sprite, {
    allowEmpty : true,
    since      : gulp.lastRun('sprite')
  })
  .pipe(spritesmith({
    imgName   : 'dest/sprite.png',
    cssName   : '_sprite.scss',
    imgPath   : `../sprite/dest/sprite.png`,
    cssFormat : 'scss',
    cssVarMap : _sprite => {
      _sprite.name = 'sprite-' + _sprite.name;
    }
  }));
  spriteData.img.pipe(gulp.dest(paths.spriteDir));
  return spriteData.css.pipe(gulp.dest(`${paths.sassDir}/foundation`));
}
exports.sprite = sprite;

//スプライト画像の圧縮
function spritemin(){
  return gulp
  .src(globs.sprites,{
    allowEmpty : true,
    since      : gulp.lastRun('spritemin')
  })
  .pipe(plumber())
  .pipe(_imagemin([
    pngquant({
      quality : [.8, .9],
      speed   : 1,
      floyd   : 0
    }),
    mozjpeg({
      quality     : 90,
      progressive : true
    }),
    _imagemin.optipng()
    ])
  )
  .pipe(gulp.dest(paths.spriteminDir));
}
exports.spritemin = spritemin;
