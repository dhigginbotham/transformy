// transformy is an object mapping tool to 
// transform objects to another object defaults
const merge = require('lodash.merge');

function transformy({ mutate = {}, input = {}, schema = {}, omit = [], loose = true }) {
  return Object.keys(input).map((key) => {
    const mutated = {};
    if (omit.indexOf(key) !== -1) return mutated;
    const tkey = mutate.hasOwnProperty(key) ? mutate[key] : null;
    if (typeof input[key] !== 'undefined' && schema.hasOwnProperty(tkey)) {
      mutated[tkey] = typeof input[key] === 'object' ? merge({}, input[key]) : input[key];
      return mutated;
    }
    if (loose === true && typeof input[key] !== 'undefined') {
      mutated[key] = typeof input[key] === 'object' ? merge({}, input[key]) : input[key];
    }
    if (schema.hasOwnProperty(key)) mutated[key] = typeof schema[key] === 'object' ? merge({}, schema[key]) : schema[key];
    return mutated;
  })
  .filter(obj => Object.keys(obj).length)
  .reduce((a, b) => {
    if (typeof a === 'undefined') a = {};
    Object.keys(b).forEach(key => a[key] = b[key]);
    return a;
  }, {});
};

module.exports = transformy;
