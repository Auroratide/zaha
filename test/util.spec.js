const { expect } = require('chai');
const { capitalize, builderFor } = require('../lib/util');

describe('util', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter', () => {
      expect(capitalize('helloWorld')).to.equal('HelloWorld');
      expect(capitalize('zahaHadid')).to.equal('ZahaHadid');
    });
  });

  describe('builderFor', () => {
    it('should wrap the value in a builder object', () => {
      expect(builderFor('value').build()).to.equal('value');
      expect(builderFor(5).build()).to.equal(5);
    });
  });
});