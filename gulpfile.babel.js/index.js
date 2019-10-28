import gulp          from 'gulp';
import requireDir    from 'require-dir';
//Tasks
requireDir('./tasks', {recurse: true});
//Default
gulp.task('default', gulp.task('watch'));