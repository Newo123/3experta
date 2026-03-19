import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";

export const html = () => {
   return app.gulp.src(app.path.src.html)
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>"
         })
      ))
      .pipe(fileInclude())
      .pipe(app.plugins.replace(/@img\//g, 'img/'))
      // If an <img> in source already uses a .webp file, temporarily move its src to data-src-webp
      // so gulp-webp-html-nosvg does not wrap it into a <picture> (which would duplicate webp).
      .pipe(
         app.plugins.if(
            app.isBuild,
            app.plugins.replace(/src=(["'])([^"']+\.webp)\1/g, 'data-src-webp="$2"')
         )
      )
      .pipe(
         app.plugins.if(
            app.isBuild,
            webpHtmlNosvg()
         )
      )
      // Restore data-src-webp back to src after webpHtmlNosvg has run
      .pipe(
         app.plugins.if(
            app.isBuild,
            app.plugins.replace(/data-src-webp=(["'])([^"']+\.webp)\1/g, 'src="$2"')
         )
      )
      .pipe(
         app.plugins.if(
            app.isBuild,
            versionNumber({
               'value': '%DT%',
               'append': {
                  'key': '_v',
                  'cover': 0,
                  'to': [
                     'css',
                     'js',
                  ]
               },
               'output': {
                  'file': 'gulp/version.json'
               }
            })
         )
      )
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.stream());
}