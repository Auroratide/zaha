const { expect } = require('chai');

const zaha = require('..');
const is = zaha.is;

describe('zaha' , () => {
  it('should build an object', () => {
    const schema = {
      key: is.string
    };

    const Builder = zaha(schema);

    const obj = new Builder().build();

    expect(obj.key).to.exist;
    expect(obj.key).to.be.a('string');
  });
});