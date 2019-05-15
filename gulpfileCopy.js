const gulp = require('gulp'); //4.0.0
const path = require('path'); // 文件路径
const fs = require('fs');
const watch = require('gulp-watch'); //监听
const browserSync = require('browser-sync').create(); //本地服务器
const sass = require('gulp-sass'); //编译less
const cleanCSS = require('gulp-clean-css'); //压缩css
const rename = require("gulp-rename"); //重命名文件
const autoprefixer = require('gulp-autoprefixer'); // 添加css浏览器前缀
const uglify = require('gulp-uglify'); //压缩js
const concatJS = require('gulp-concat'); //合并js
const del = require('del'); // 删除文件
const imagemin = require('gulp-imagemin'); // 图片压缩
const swig = require('gulp-swig'); // 一个简单的，强大的，可扩展的JavaScript模板引擎
const data = require('gulp-data'); // 
const fileinclude = require('gulp-file-include'); // 模版复用
const chalk = require('chalk'); // 字符串样式
const plumber = require('gulp-plumber'); //修复Node Streams管道的问题
const log = console.log; // log打印
const reload = browserSync.reload;
const env = process.env.NODE_ENV;
let Dir = 'dist';
// 打包环境处理
if (env == 'development') {
  log('["........."' + chalk.red('开发环境') + ".........");
  Dir = 'dist';
} else {
  log('["........."' + chalk.red('打包环境') + ".........");
  Dir = 'build';
}
// 基本路径配置
let paths = {
  styles: {
    app: 'app/sass/*.scss',
    dist: `${Dir}/css`
  },
  scripts: {
    app: 'app/js/*.js',
    dist: `${Dir}/js`
  },
  html: {
    app: 'app/*.html',
    all: 'app/**/*.html',
    dist: `${Dir}`
  },
  images: {
    app: 'app/images/**/*.{jpg,jpeg,png,gif}',
    dist: `${Dir}/images`
  }
}

// html
gulp.task('html', function () {
  return gulp.src(paths.html.app, {
      base: 'app'
    })
    .pipe(data(function (file) {
      return JSON.parse(fs.readFileSync('./data/' + path.basename(file.path, '.html') + '.json'));
    }))
    .pipe(swig({
      defaults: {
        cache: false,
        locals: {
          site_name: "My Web",
          description: '光浑岁月.....',
          author: 'jsonLiao'
        }
      },
      data: {
        headline: "Welcome To Here"
      }
    }))
    .pipe(fileinclude({
      prefix: '@@'
    }))
    .pipe(gulp.dest(paths.html.dist))
    .pipe(browserSync.reload({
      stream: true
    }));
})

// 压缩图片
gulp.task('img', function () {
  return gulp.src(paths.images.app)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dist))
    .pipe(browserSync.reload({
      stream: true
    }));
})

// sass->css
gulp.task('css', function () {
  return gulp.src(paths.styles.app)
    .pipe(plumber())
    .pipe(sass()) //编译sass
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0'],
      cascade: false, //是否美化属性值 默认：true 像这样：
      remove: false //是否去掉不必要的前缀 默认：true 
    }))
    .pipe(gulp.dest(paths.styles.dist)) //当前对应css文件
    .pipe(reload({
      stream: true
    })) //更新.css
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cleanCSS())
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.styles.dist)) //当前对应css文件
    .pipe(reload({
      stream: true
    })); //更新min.css
})

// js
gulp.task('js', function () {
  return gulp.src(paths.scripts.app)
    // .pipe(jshint()) //检查代码
    .pipe(uglify()) //压缩js
    .pipe(gulp.dest(paths.scripts.dist))
    .pipe(browserSync.reload({
      stream: true
    }));
})

//复制公共库目录下的所有内容
gulp.task('copy', function () {
  return gulp.src('app/libs/**')
    .pipe(concatJS('globle.js'))
    .pipe(gulp.dest(paths.scripts.dist));
});

// 监听
gulp.task('watchs', function () {
  gulp.watch(paths.html.app, gulp.series('html'));
  gulp.watch(paths.styles.app, gulp.series('css'));
  gulp.watch(paths.scripts.app, gulp.series('js'));
  gulp.watch(paths.images.app, gulp.series('img'));
})

// 本地服务器
gulp.task('server', function () {
  // 本地服务器1
  browserSync.init({
    notify: false,
    port: 9090,
    open: false,
    ghostMode: false,
    server: {
      baseDir: ['./dist'],
      directory: true,
      injectChanges: true,
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  }).emitter.on('service:running', function (options) {
    let printUrl = function (url) {
      log(chalk.grey(' ----------------------------------------'));
      log('[' + chalk.red('访问地址') + ']: ' + chalk.bgRed.bold(url));
      log(chalk.grey(' ----------------------------------------'));
    };
    printUrl(`http://127.0.0.1:${options.port}`);
  });
})

gulp.task('build', gulp.series(
  clean,
  gulp.parallel('server', 'watchs', 'html', 'css', 'js', 'copy', 'img')
))

gulp.task('buildPro', gulp.series(
  clean,
  gulp.parallel('html', 'css', 'js', 'copy', 'img')
))

function clean() {
  return del([`${Dir}`]);
}

if (env == 'development') {
  gulp.task('default', gulp.series('build'));
} else {
  gulp.task('default', gulp.series('buildPro'));
}