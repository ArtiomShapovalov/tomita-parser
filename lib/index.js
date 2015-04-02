var spawn = require('child_process').spawn;
var path = require('path');
var parser = require('xml2json');

function Tomita(input, config, callback) {

  var self = this;
  self.xml = '';
  self.err = '';

  self.tomita = spawn(path.join(__dirname, '/bin/tomita'), [config], {
    cwd: path.dirname(config)
  });

  self.tomita.stdin.setEncoding('utf8');
  self.tomita.stdin.write(input);
  self.tomita.stdin.end();

  self.tomita.stdout.on('data', function (data) {
    self.xml = self.xml + data;
  });

  self.tomita.stderr.on('data', function (data) {
    self.err = self.err + data;
  });

  self.tomita.on('error', function (err) {
    callback(err);
  });

  self.tomita.on('close', function (code) {
    if(code !== 0) {
      callback(new Error(self.err));
    } else {
      var raw = parser.toJson(self.xml, { object: true });

      callback(null, raw.fdo_objects.document.facts, raw);
    }
  });
}

module.exports = Tomita;
