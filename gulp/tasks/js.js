import webpack from "webpack-stream";


export const js = () => {
   const webpackConfig = {
      mode: 'none',
      output: {
         filename: 'app.js',
      }
   };
   return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "JS",
            message: "Error: <%= error.message %>"
         }))
      )
      .pipe(webpack(webpackConfig))
      .pipe(app.gulp.dest(app.path.build.js))
      .pipe(app.plugins.browsersync.stream());
}