const { expect } = require('chai');
const { execSync } = require('child_process');

describe('movie-search', function() {

  context('valid arguments', function() {

    it('valid search outputs lines of text', function() {
      const response = execSync('node movie-search \'human being\'').toString();
      expect(response).to.match(/^(?:[^ ].+\n)*$/);
    });

  });

  context('invalid arguments', function() {

    it('search with no argument', function() {
      const response = execSync('node movie-search').toString();
      expect(response).to.equal('');
    });

    it('search with too many arguments', function() {
      const response = execSync('node movie-search Rambo Ran').toString();
      expect(response).to.equal('');
    });

  });

});
