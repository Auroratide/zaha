const builderFor = value => ({
  build: () => value
});

const is = value => builderFor(value);

is.string = () => builderFor('ZAHA_DEFAULT_STRING');
is.int = () => builderFor(123);
is.number = () => builderFor(123.456);
is.boolean = () => builderFor(true);

module.exports = is;