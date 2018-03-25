const { expect } = require('chai');
const { capitalize } = require('../lib/util');

describe('util', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter', () => {
      expect(capitalize('helloWorld')).to.equal('HelloWorld');
      expect(capitalize('zahaHadid')).to.equal('ZahaHadid');
    });
  });
});