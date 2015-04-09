# Tomita

Tomita is a wrapper for [Yandex](http://yandex.ru) [Tomita Parser](http://api.yandex.ru/tomita/) tool

Tomita Parser is a tool for extracting structured data (facts) from text in natural language.

## Installation

    npm install tomita-parser

## Documentation
[Yandex documentation](http://api.yandex.ru/tomita/doc/tutorial/concept/about.xml)

## Usage:
```js
var Tomita = require('tomita-parser');
new Tomita('input text', '/absolute/path/to/config.proto', function (err, res) {
	// ...
});
```
## Test
```
npm test
```
or [Yandex examples.zip](http://download.cdn.yandex.net/tomita/examples.zip) 

## License

### Tomita Parser
[License](http://legal.yandex.ru/tomita/)
© 2012 ООО «ЯНДЕКС»
