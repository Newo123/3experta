//основной модуль
import gulp from "gulp";

//импорт путей
import { path } from "./gulp/config/path.js";

//импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

//передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

//импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { fontsStyle, otfToTtf, ttfToWoff } from "./gulp/tasks/fonts.js";
import { ftp } from "./gulp/tasks/ftp.js";
import { images } from "./gulp/tasks/images.js";
import { js } from "./gulp/tasks/js.js";
import { reset } from "./gulp/tasks/reset.js";
import { scss } from "./gulp/tasks/scss.js";
import { server } from "./gulp/tasks/server.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";

//Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.files, copy); //gulp.series(copy, ftp)
  // gulp.watch(path.watch.html, html); //gulp.series(html, ftp)
  gulp.watch(path.watch.scss, scss); //gulp.series(scss, ftp)
  gulp.watch(path.watch.js, js); //gulp.series(js, ftp)
  gulp.watch(path.watch.images, images); //gulp.series(images, ftp)
}

export { svgSprive };

//последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(
  fonts,
  gulp.parallel(
    copy,
    // html,
    scss,
    js,
    images,
  ),
);

//построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

//экспорт сценариев
export { build, deployFTP, deployZIP, dev };

//выполнение сценария по умолчанию
gulp.task("default", dev);
