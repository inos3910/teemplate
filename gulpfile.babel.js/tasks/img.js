import gulp from 'gulp';
import { globs, paths } from '../config.js';
import squoosh from 'gulp-libsquoosh';
import path from 'path';
import del from 'del'; //ファイル削除

//webp生成
import gulpWebp from 'gulp-webp';
import rename from 'gulp-rename';

//WebPへ変換
function webp() {
  return gulp.src(globs.toWebp,{
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


//出力済みファイルを削除
function deleteImageOptimizedDir(done) {
  return del([paths.imageOptimizedDir], done);
}
exports.deleteImageOptimizedDir = deleteImageOptimizedDir;

// webp・avif化
function imageConversion() {
  return gulp.src(globs.images,{
    allowEmpty : true,
    since      : gulp.lastRun(imageConversion)
  })
  .pipe(rename((path) => {
    path.basename += path.extname;
  }))
  .pipe(squoosh((src) => {
    const extname = path.extname(src.path);
    let options = {
      encodeOptions: squoosh.DefaultEncodeOptions[extname],
    };

    if (extname === '.png') {
      options = {
        encodeOptions: {
          webp: {
            lossless: true,
          },
          avif: {
            quality: 90,
          }
        },
      };
    }

    if (extname === '.jpg') {
      options = {
        encodeOptions: {
          webp: {
            quality: 90,
          },
          avif: {
            quality: 90,
          }
        },
      };
    }

    return options;
  }))
  .pipe(gulp.dest(paths.imageOptimizedDir));
}
exports.imageConversion = imageConversion;
