import gulp from 'gulp';
import { watcher } from './gulpfiles/tasks/watch.mjs';
import { deleteCssDir, buildCss } from './gulpfiles/tasks/css.mjs';
import { deleteJsDistDir, buildJsAll } from './gulpfiles/tasks/js.mjs';
import { deleteTsDistDir, buildTs } from './gulpfiles/tasks/ts.mjs';
import { browsersync } from './gulpfiles/tasks/browsersync.mjs';
import { webp } from './gulpfiles/tasks/img.mjs';

//build CSS&JS
const buildTask = gulp.series(
  deleteCssDir,
  deleteJsDistDir,
  buildCss,
  buildJsAll
);

//build TypeScript
const tsTask = gulp.series(deleteTsDistDir, buildTs);

//画像処理系
const webpTask = webp;

//タスク
export { buildTask as build };
export { tsTask as buildTs };
export { webpTask as webp };

//実行
export default gulp.series(watcher, browsersync);
