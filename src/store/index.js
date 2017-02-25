if ( process.env.NODE_ENV === 'production' ) {
  // This is a known quirk (.default) when importing
  // an ES6-default-exported module with CommonJS
  // `require`
  module.exports = require('./index.prod').default;
} else {
  // This is a known quirk (.default) when importing
  // an ES6-default-exported module with CommonJS
  // `require`
  module.exports = require('./index.dev').default;
}
