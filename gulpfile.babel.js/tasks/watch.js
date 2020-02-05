//Task:Watch
import gulp from 'gulp'
import { globs } from '../config'

const watcher = done => {
  //sass
  gulp.watch(globs.sass, gulp.series(
    'delete:cssDir',
    'build:css'
    ))
  //js
  gulp.watch(globs.js, gulp.series(
    'delete:jsDistDir',
    'build:js'
    ))
  //html
  gulp.watch(globs.html, gulp.task('reload:html'))
  //TypeScript
  gulp.watch(globs.ts,   gulp.series(
    'clean:ts',
    'build:ts'
    ))
  done()
}

gulp.task('watch', gulp.series(watcher, 'browsersync'))
