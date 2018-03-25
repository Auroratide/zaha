const { expect } = require('chai');

const zaha = require('..');
const is = zaha.is;

describe('zaha' , () => {
  let schema;

  beforeEach(() => {
    schema = {
      key: is.string
    };
  });

  it('should build an object', () => {
    const Builder = zaha(schema);
    const obj = new Builder().build();

    expect(obj.key).to.exist;
    expect(obj.key).to.be.a('string');
  });

  it('should use the exact provided value', () => {
    const Builder = zaha(schema);
    const obj = new Builder()
      .withKey('Exact Key')
      .build();

    expect(obj.key).to.equal('Exact Key');
  });

  it('should use all provided values', () => {
    schema.prop = is.string;
    const Builder = zaha(schema);
    const obj = new Builder()
      .withKey('Exact Key')
      .withProp('Another value')
      .build();

    expect(obj.key).to.equal('Exact Key');
    expect(obj.prop).to.equal('Another value');
  });

  it('should be extensible', () => {
    const BaseBuilder = zaha(schema);
    class Builder extends BaseBuilder {
      withJoy() {
        this.schema.key = () => 'Joy!';
        return this;
      }
    }

    const obj = new Builder()
      .withJoy()
      .build();

    expect(obj.key).to.equal('Joy!');
  });
});