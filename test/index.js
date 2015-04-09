var Lab = require('lab');
var Code = require('code');

// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('Tomita search', function() {

  var Tomita = require('../index');

  it('Найти дату', function(done) {

    new Tomita('Юрий Алексеевич Гагарин родился в пятницу, 9 марта 1934 года.', __dirname + '/config1/config.proto', function (err, data) {
      //console.dir(data);
      if (err) {
        done(err);
      } else {
        expect(data.Date.Day.$.val).to.equal('9');
        expect(data.Date.Month.$.val).to.equal('МАРТ');
        expect(data.Date.Year.$.val).to.equal('1934 ГОДА');

        done();
      }
    });

  }); 

   it('Найти где и когда', function(done) {

    new Tomita('Подкрепился у лисицы 14 августа.', __dirname + '/config2/config.proto', function (err, data) {
      //console.dir(data);
      if (err) {
        done(err);
      } else {
        expect(data.Sparrow.Who.$.val).to.equal('ЛИСИЦА');
        expect(data.Sparrow.When.$.val).to.equal('14 АВГУСТА');

        done();
      }
    });

  }); 

  it('Invalid config.proto path', function(done) {
    new Tomita('', 'invalid.proto', function (err, data) {
      expect(err).not.to.equal(null);
      done();
    });
  });

});