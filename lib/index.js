var spawn = require('child_process').spawn;
var path = require('path');
var parser = require('xml2js').parseString;
var env = process.env.NODE_ENV || 'development';

function Tomita(input, config, callback) {

  var self = this;
  self.xml = '';
  self.err = '';

  if (typeof input !== 'string' || input === '') {
    callback();
    return;
  }

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
    if (env === 'development') {
      console.error(self.err);
    }

    if(code !== 0) {
      callback(code);
    } else {
      parser(self.xml, {explicitArray: false}, function (err, result) {
        if (err) {
          callback(err);
        } else {
          var facts = result.fdo_objects.document ? result.fdo_objects.document.facts: null;
          callback(null, facts);
        }
      });
    }
  });
}

module.exports = Tomita;
