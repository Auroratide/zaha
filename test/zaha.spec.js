const { expect } = require('chai');

const zaha = require('..');
const is = zaha.is;

describe('zaha' , () => {

  describe('basic types', () => {
    let obj;

    beforeEach(() => {
      const Builder = zaha({
        value: is('some value'),
        string: is.string(),
        number: is.number(),
        int: is.int(),
        boolean: is.boolean()
      });

      obj = new Builder().build();
    });

    it('should be the given value', () => {
      expect(obj.value).to.exist;
      expect(obj.value).to.equal('some value');
    });

    it('should be a string', () => {
      expect(obj.string).to.exist;
      expect(obj.string).to.be.a('string');
    });

    it('should be a number', () => {
      expect(obj.number).to.exist;
      expect(obj.number).to.be.a('number');
    });

    it('should be an integer', () => {
      expect(obj.int).to.exist;
      expect(obj.int).to.be.a('number');
      expect(obj.int).to.equal(Math.floor(obj.int));
    });

    it('should be a boolean', () => {
      expect(obj.boolean).to.exist;
      expect(obj.boolean).to.be.a('boolean');
    });
  });

  describe('objects', () => {
    it('should accept other builders in the schema', () => {
      const BuilderA = zaha({ a: is.string() });
      const BuilderB = zaha({
        b: new BuilderA()
      });
  
      const obj = new BuilderB().build();
  
      expect(obj.b.a).to.exist;
      expect(obj.b.a).to.be.a('string');
    });

    it('should allow nested objects in the schema', () => {
      const Builder = zaha({
        a: is.object({
          b: is.string()
        })
      });

      const obj = new Builder().build();

      expect(obj.a.b).to.exist;
      expect(obj.a.b).to.be.a('string');
    });

    it('should allow doubly nested objects in the schema', () => {
      const Builder = zaha({
        a: is.object({
          b: is.object({
            c: is.number()
          })
        })
      });

      const obj = new Builder().build();

      expect(obj.a.b.c).to.exist;
      expect(obj.a.b.c).to.be.a('number');
    });

    it('should build objects with no specific schema', () => {
      const Builder = zaha({
        a: is.object()
      });

      const obj = new Builder().build();

      expect(obj.a).to.exist;
      expect(obj.a).to.be.a('object');
    });
  });

  describe('arrays', () => {
    it('should allow an array of basic types', () => {
      const Builder = zaha({
        a: is.arrayOf(is.string())
      });

      const obj = new Builder().build();

      expect(obj.a).to.exist;
      expect(obj.a).to.be.a('array');
      expect(obj.a[0]).to.be.a('string');
    });

    it('should allow an array of objects', () => {
      const Builder = zaha({
        a: is.arrayOf(is.object({ b: is.string() }))
      });

      const obj = new Builder().build();

      expect(obj.a).to.exist;
      expect(obj.a).to.be.a('array');
      expect(obj.a[0]).to.be.a('object');
    });

    it('should allow an array of builders', () => {
      const BuilderA = zaha({ a: is.string() });
      const BuilderB = zaha({
        b: is.arrayOf(new BuilderA())
      });

      const obj = new BuilderB().build();

      expect(obj.b).to.exist;
      expect(obj.b).to.be.a('array');
      expect(obj.b[0].a).to.be.a('string');
    });

    it('should allow an array of arrays', () => {
      const Builder = zaha({
        a: is.arrayOf(is.arrayOf(is.number()))
      });

      const obj = new Builder().build();

      expect(obj.a).to.exist;
      expect(obj.a).to.be.a('array');
      expect(obj.a[0]).to.be.a('array');
      expect(obj.a[0][0]).to.be.a('number');
    });
  });

  describe('functions', () => {
    it('should be a function', () => {
      const Builder = zaha({
        f: is.function()
      });

      const obj = new Builder().build();

      expect(obj.f).to.not.throw();
    });
  });

  describe('oneOf', () => {
    it('should be one of the provided values in the array', () => {
      const values = ['value 1', 'value 2'];

      const Builder = zaha({
        n: is.oneOf(values)
      });

      const obj = new Builder().build();

      expect(values.includes(obj.n)).to.be.true;
    });
  });

  describe('with', () => {
    it('should use the exact provided value', () => {
      const Builder = zaha({
        key: is.string()
      });

      const obj = new Builder()
        .withKey('Exact Key')
        .build();

      expect(obj.key).to.equal('Exact Key');
    });

    it('should use all provided values', () => {
      const Builder = zaha({
        keyA: is.string(),
        keyB: is.number()
      });

      const obj = new Builder()
        .withKeyA('Exact Key')
        .withKeyB(55)
        .build();
  
      expect(obj.keyA).to.equal('Exact Key');
      expect(obj.keyB).to.equal(55);
    });

    it('should allow nested builders to be overridden', () => {
      const BuilderA = zaha({ a: is.string() });
      const BuilderB = zaha({
        b: new BuilderA()
      });
  
      const obj = new BuilderB()
        .withB(new BuilderA()
          .withA('a string')
          .build())
        .build();
  
      expect(obj.b.a).to.equal('a string');
    });
  });

  it('should be extensible', () => {
    const BaseBuilder = zaha({
      key: is.string()
    });

    class Builder extends BaseBuilder {
      withJoy() {
        this.schema.key = is('Joy!');
        return this;
      }
    }

    const obj = new Builder()
      .withJoy()
      .build();

    expect(obj.key).to.equal('Joy!');
  });

});