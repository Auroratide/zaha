const clone = require('clone');
const { capitalize, builderFor } = require('./util');

module.exports = (schema) => {
  const Builder = function() {
    this.schema = clone(schema, false);
  };

  const properties = Object.keys(schema);

  properties.forEach(prop => {
    Builder.prototype[`with${capitalize(prop)}`] = function(value) {
      this.schema[prop] = builderFor(value);
      return this;
    };
  });

  Builder.prototype.build = function() {
    return properties.reduce((obj, prop) => {
      return Object.assign(obj, {[prop]: this.schema[prop].build()});
    }, {});
  };

  return Builder;
};