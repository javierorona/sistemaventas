"use strict";var gulp=require("gulp"),conf=require("./conf"),replace=require("gulp-replace"),htmlmin=require("gulp-htmlmin");gulp.task("absolute-path-compress",function(){return gulp.src(conf.paths.dist+"index.html").pipe(replace(/=\"\/application\.min/g,'="./application.min')).pipe(replace(/\/app\//g,"./app/")).pipe(htmlmin({collapseWhitespace:!0,keepClosingSlash:!0,removeComments:!0,removeEmptyAttributes:!0,removeRedundantAttributes:!0})).pipe(gulp.dest(conf.paths.dist))});