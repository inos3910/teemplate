import gulp from 'gulp';
import { globs, paths } from '../config.mjs';
//SVGの圧縮
import _svgmin from 'gulp-svgmin';

export const svgmin = () => {
  return gulp
    .src(globs.svg, {
      allowEmpty: true,
      since: gulp.lastRun('svgmin'),
    })
    .pipe(
      _svgmin({
        plugins: [
          { removeViewBox: false },
          { removeUselessStrokeAndFill: false },
          { cleanupIDs: false },
          { removeHiddenElems: false },
          { cleanUpEnableBackground: false },
          { removeDoctype: false },
          { removeXMLProcInst: false },
          { moveElemsAttrsToGroup: false },
          { moveGroupAttrsToElems: false },
          { collapseGroups: false },
          { convertShapeToPath: true },
        ],
      })
    )
    .pipe(gulp.dest(paths.svgminDir));
};
