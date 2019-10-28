//Task:Watch
import gulp from 'gulp'
import { globs } from '../config'

const watcher = done => {
  gulp.watch(globs.sass, gulp.task('build:css'))
  gulp.watch(globs.js, gulp.task('build:js'))
  gulp.watch(globs.html, gulp.task('reload:html'))
  done()
}

gulp.task('watch', gulp.series(watcher, 'browsersync'))
