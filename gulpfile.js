var gulp = require('gulp');

var files = {
  "darwin": 'tomita-mac.bz2',
  "freebsd": 'tomita-freebsd64.bz2',
  "linux": 'tomita-linu' + process.arch + '.bz2',
  "win32": 'tomita-freebsd64.bz2'
};

var file = files[process.platform];
var url = 'http://download.cdn.yandex.net/tomita/' + file;
const BIN = 'lib/bin/';

gulp.task('download', function () {
  return require("gulp-download")(url)
    .pipe(gulp.dest(BIN));
});

gulp.task('decompress', ['download'], function (done) {
  var Bunzip = require('seek-bzip');
  var fs = require('fs');

  var compressedData = fs.readFileSync(BIN + file);
  var data = Bunzip.decode(compressedData);

  fs.writeFileSync(BIN + 'tomita', data);
  fs.chmodSync(BIN + 'tomita', 0755);
  fs.unlinkSync(BIN + file);
  done();
});

gulp.task('default', ['decompress']);