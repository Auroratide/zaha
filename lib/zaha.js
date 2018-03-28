const { capitalize, builderFor } = require('./util');

module.exports = (schema) => {
  const Builder = function() {};
  const properties = Object.keys(schema);

  Builder.prototype.schema = schema;

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