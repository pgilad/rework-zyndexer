# rework-zyndexer [![Build Status](http://img.shields.io/travis/pgilad/rework-zyndexer.svg?style=flat)](https://travis-ci.org/pgilad/rework-zyndexer)

> [Rework](https://github.com/reworkcss/rework) plugin to scale down z-indexes in your stylesheet with ease using [scaler](https://github.com/pgilad/scaler)

From [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index):

```
The z-index CSS property specifies the z-order of an element and its descendants.
When elements overlap, z-order determines which one covers the other.
An element with a larger z-index generally covers an element with a lower one.
```

The problems start when your z-indexes are out of control. `z-index: 90001` - familiar?

Another critical problem has arose lately with support for tablets. A recent article about supporting iPad Air 2
mentions that iPad Air 2 only supports z-indexes under 100. [Reference](http://alistafart.com/article/4-ways-to-make-your-website-thin-enough-for-the-ipad-air-2/)

Well, if you write your css (or any preprocessor like less, stylus, sass etc.) with messy z-indexes,
or if you just want to prettify your numbers, and especially if you wish to support tablet users such as iPad Air 2 users,
you can do so with ease.

This is a plugin for [Rework](https://github.com/reworkcss/rework) and uses [scaler](https://github.com/pgilad/scaler) to scale the z-indexes.

Given a sample css file:
```css
body {
  z-index: 12;
  color: red;
}

.some-class {
  z-index: 5000;
}
```

Running this plugin will output by default:
```css
body {
  z-index: 0;
  color: red;
}

.some-class {
  z-index: 1;
}
```

See how easy that was?

## Install

```bash
$ npm install --save-dev rework-zyndexer
```

## Usage

```js
var rework = require('rework');
var zyndexer = require('rework-zyndexer');

var css = fs.readFileSync('./css/style.css', 'utf8');

// Basic example
var output = rework(css)
    .use(zyndexer())
    .toString();
// --> output now contains the transformed css file with sane scaled z-indexes

// An example of using the options
var output = rework(css)
    .use(zyndexer({
        limit: 50,
        start: 1,
        ignore: [-1]
    }))
    .toString();

    // output will be the transformed css with z-indexes that start from 1
    // z-indexes with values of -1 will be ignored (and untouched)
    // If the number of unique z-indexes is above 50 you will get an error
```

## API

`rework-zyndexer(params)`

`params` is an optional object with the following properties:

### limit

Type: `number`

Default: `100`

The number to limit the z-indexes. This has no effect on the z-indexes,
but will provide you a sanity check to make sure you don't have too many unique
z-indexes so that the limit will be reached.

### start

Type: `number`

Default: `0`

The number to start the z-indexes from

### step

Type: `number`

Default: `1`

The increment step to use for z-indexes

### ignore

Type: `array`

Default: `[]`

If you want `rework-zyndexer` to ignore certain z-index values (such as `-1`) you can
specify them in an array. For example `[-1, 0]`

## Benchmark

```sh
$ npm run bench
```

## License

MIT @[Gilad Peleg](http://giladpeleg.com)
