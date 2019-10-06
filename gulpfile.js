const gulp = require('gulp');
const i18nextParser = require('i18next-parser').gulp;

gulp.task('i18next', () => gulp.src(['pages/*', 'components/*'])
  .pipe(new i18nextParser({
    locales: ['en', 'ar'],
    output: 'locales/$LOCALE/$NAMESPACE.json',
  }))
  .pipe(gulp.dest('./static')));
