const { capitalize } = require('./util');

module.exports = (schema) => {
  const Builder = function() {};
  const properties = Object.keys(schema);

  Builder.prototype.schema = schema;

  Builder.prototype.build = function() {
    return properties.reduce((obj, prop) => {
      return Object.assign(obj, {[prop]: this.schema[prop]()});
    }, {});
  };

  return Builder;
};