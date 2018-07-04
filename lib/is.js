const { builderFor } = require('./util');
const zaha = require('./zaha');

const is = value => builderFor(value);

is.string = () => builderFor('ZAHA_DEFAULT_STRING');
is.int = () => builderFor(123);
is.number = () => builderFor(123.456);
is.boolean = () => builderFor(true);

is.object = (schema) => new (zaha(schema || {}));
is.array = () => builderFor([]);
is.arrayOf = (builder) => builderFor([builder.build()]);
is.function = () => builderFor(() => {});

is.oneOf = (values) => builderFor(values[0]);

module.exports = is;