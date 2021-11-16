import gulp                     from 'gulp'
const sass = require('gulp-sass')(require('sass'));
import fiber                    from 'fibers'
//エラーでgulpが終了するのを止める
import plumber                  from 'gulp-plumber'
//デスクトップ通知
import notify                   from 'gulp-notify'
//小さい画像をbase64に変換
import base64                   from 'gulp-base64'
//PostCss
import postcss                  from 'gulp-postcss'
//import cssnext                  from 'postcss-cssnext'
import cssImport                from 'postcss-import'
import autoprefixer             from 'autoprefixer';
//flexboxのバグを自動修正
import flexBugsFixes            from 'postcss-flexbugs-fixes'
//ファイル名から画像パスやサイズを取得
import assets                   from 'postcss-assets'
//メディアクエリを整理する
import mqpacker                 from 'css-mqpacker'
//cssを圧縮する
import csso                     from 'gulp-csso'
//config
import {paths, globs} from '../config'
//cache
import diff                     from 'gulp-diff-build'
import cache                    from 'gulp-cached'
import progeny                  from 'gulp-progeny'
import browserSync              from 'browser-sync'
//ファイル削除
import del                      from 'del'
import dependents               from 'gulp-dependents'
import sassGlob                 from 'gulp-sass-glob-use-forward'

const dependentsConfig = {
  ".scss": {
    parserSteps: [
    /(?:^|;|{|}|\*\/)\s*@(import|use|forward|include)\s+((?:"[^"]+"|'[^']+'|url\((?:"[^"]+"|'[^']+'|[^)]+)\)|meta\.load\-css\((?:"[^"]+"|'[^']+'|[^)]+)\))(?:\s*,\s*(?:"[^"]+"|'[^']+'|url\((?:"[^"]+"|'[^']+'|[^)]+)\)|meta\.load\-css\((?:"[^"]+"|'[^']+'|[^)]+)\)))*)(?=[^;]*;)/gm,
    /"([^"]+)"|'([^']+)'|url\((?:"([^"]+)"|'([^']+)'|([^)]+))\)|meta\.load\-css\((?:"([^"]+)"|'([^']+)'|([^)]+))\)/gm
    ],
    prefixes: ["_"],
    postfixes: [".scss", ".sass"],
    basePaths: []
  }
};

//出力済みファイルを削除
function deleteCssDir(done) {
  return del([paths.cssDir], done);
}
exports.deleteCssDir = deleteCssDir;

const processors = [
assets({
  baseUrl     : `${paths.serverDir}/`,
  basePath    : paths.themeDir,
  loadPaths   : [
  'assets/images/',
  'assets/svg/',
  ],
  relative    : true,
  cachebuster : true,
}),
autoprefixer({
  cascade: false,
  grid: true
}),
mqpacker({
  sort: true
}),
flexBugsFixes,
cssImport({
  path: [ 'node_modules' ]
})
];

function buildCss() {
  return gulp.src(globs.sass, {
    allowEmpty : true,
    sourcemaps : true
  })
  .pipe(plumber({
    errorHandler: notify.onError('<%= error.message %>')
  }))
  .pipe(diff())
  .pipe(cache('sass'))
  .pipe(sassGlob())
  .pipe(dependents())
  .pipe(sassGlob())
  // .pipe(progeny())
  .pipe(sass({
    fiber: fiber,
    outputStyle: 'expanded',
  }))
  .pipe(base64({
    baseDir      : paths.imageDir,
    extensions   : ['svg', 'png', /\.jpg#datauri$/i],
    exclude      : [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
    maxImageSize : 8 * 1024,
    debug        : true
  }))
  .pipe(postcss(processors))
  .pipe(csso({
    restructure : false,
    sourceMap   : false,
    debug       : true
  }))
  .pipe(gulp.dest(paths.cssDir, {
    sourcemaps : '.'
  }))
  .pipe(notify('buildCss finished'))
  .pipe(browserSync.reload({
    stream: true
  }));
}
exports.buildCss = buildCss;