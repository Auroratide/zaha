const is = function(value) {
  return () => value;
};

is.string = () => 'ZAHA_DEFAULT_STRING';
is.int = () => 123;
is.number = () => 123.456;
is.boolean = () => true;

module.exports = is;