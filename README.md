# Zaha

**Zaha** is a javascript utility for generating test builders!  Builders allow you to:

1. Quickly create test objects automatically populated with default fields
1. Abstract the structure of complex objects behind a fluent interface

## Get Started

First, you'll want to install the library:

```
npm i -D zaha
```

Then create a test builder:

```js
// room-builder.js

import zaha, { is } from 'zaha';

export default zaha({
  length: is.number(),
  width: is.number(),
  furniture: is.arrayOf(is.string())
});
```

Then use your new builder in a test!

```js
// room.spec.js

import RoomBuilder from './room-builder';

const room = new RoomBuilder()
  .withWidth(500),
  .withFurniture(['chair', 'bed'])
  .build();
```

## Details

**Zaha** is a function which takes as input a *schema* and outputs a *builder class*.

### Schemas

A *schema* is an object whose fields are all *builders*.  It defines what fields you want your eventually build object to contain.  The following example of a schema defines an object with a string and numeric field, for instance.

```js
import { is } from 'zaha';

const schema = {
  name: is.string(),
  age: is.number()
};
```

**is**

You might notice that this mystical `is` object can be used to define the types of fields.  `is` provides the following:

* `is(value)`: An exact value the field should be when the final object is built
* `is.string()`: A string field
* `is.number()`: A decimal number
* `is.int()`: An integer number
* `is.boolean()`: A boolean value
* `is.object(schema)`: Converts the schema into a basic builder; useful for nested structures
* `is.arrayOf(builder)`: Defines an array of the provided builder type
* `is.function()`: A callable function

The following example shows how to use `is.object` and `is.arrayOf`:

```js
const schema = {
  nested: is.object({
    array: is.arrayOf(is.int()),
    exact: is('This particular string')
  })
};
```

**Zaha Builders**

Though `is` is useful, in reality these fields can take any *builder*.  A *builder* object is simply an object which has the `build()` method defined on it.  This means you can pass in builders created by **Zaha** into the schema:

```js
const InnerBuilder = zaha(innerSchema);

const schema = {
  value: new InnerBuilder()
};
```

**Custom Builders**

A *builder* is any object which has `build()` defined on it.  This means you can make your own collection of domain-specific basic builders that you can pass to a **Zaha** schema.

```js
const randomString = {
  build: () => random.string()
};

const author = is.object({
  name: randomString,
  age: is.number()
});

const schema = { author };
```

### Builders

The purpose of **Zaha** is to create configurable builders.  The `zaha` function converts a schema into a builder class that can be instantiated, like so:

```js
const Builder = zaha(schema);
const builder = new Builder();
```

Builders define two function types:

* `with<PropertyName>(value)`: Sets the value of the given property to the given argument
* `build()`: Emits an object with the values provided by `with`

A `with` function is generated for each first-order property defined in the schema.  You can chain them like so:

```js
const room = new RoomBuilder()
  .withWidth(100)
  .withLength(200)
  .build();
```

**Note on property names**

* Snake-cased property names, like `last_name`, will end up with a `with` function like `withLast_name`
* Property names which contain arbitrary symbols, like `is-admin?`, are not supported

### Extending Builders

**Zaha** emits a class which can be extended.  If you want to define custom methods on the builder, it's simple to do:

```js
const Base = zaha({
  furniture: is.arrayOf(is.string())
});

export default class RoomBuilder extends Base {
  withoutFurniture() {
    this.schema.furniture = is([]);
    return this;
  }
}
```

## Example

Here is a full use-case example.  Chai is being used here, but any testing framework works with **Zaha**.

```js
// room-builder.js
import zaha, { is } from 'zaha';

export default zaha({
  length: is.number(),
  width: is.number(),
  furniture: is.arrayOf(is.string())
});
```

```js
import { expect } from 'chai';
import RoomBuilder from './room-builder';
import { moveAllFurniture } from './room-utils';

describe('Furniture Mover', () => {
  it('moves all furniture from one room into the other', () => {
    const furniture = ['chair', 'table'];
    const formerRoom = new RoomBuilder()
      .withFurniture(furniture)
      .build();
    const newRoom = new RoomBuilder()
      .withFurniture([])
      .build();

    moveAllFurniture.from(formerRoom).to(newRoom);

    expect(formerRoom.furniture).to.be.empty;
    expect(newRoom.furniture).to.deep.equal(furniture);
  });
});
```