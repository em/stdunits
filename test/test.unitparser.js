var stdunit = require('../')
  , expect = require('chai').expect;

describe('define', function() {
  it('allows comma separated synonyms', function() {
    expect(
      stdunit.to('mm', '2in')
    ).eq(
      stdunit.to('mm', '2"')
    );
  });
});

describe('to', function() {
  it('converts recursively', function() {
    var result = stdunit.to('mm', '1in');
    expect(result).eq(25.4);
  });

  it('accepts implied units', function() {
    var result = stdunit.to('mm', '10');
    expect(result).eq(10);
  });

  it('accepts different units', function() {
    var result = stdunit.to('in', '2mm');
    expect(result).eq(1/25.4*2);
  });

  it('derives units from context', function() {
    var result = stdunit.to('px', '1in', {ppi: 100});
    expect(result).eq(100);
  });

  it('contextual units work both ways', function() {
    var result = stdunit.to('in', '100px', {ppi: 100});
    expect(result).closeTo(1, 0.0001);
  });

  it('handles percents', function() {
    var result = stdunit.to('mm', '2%', {scale: 50});
    expect(result).eq(1);
  });

  it('multi contextual', function() {
    var result = stdunit.to('px', '100%', {scale: 25.4, ppi:10});
    expect(result).closeTo(10, 0.0001);
  });

});


describe('match', function() {
  it('returns array of measurements', function() {
    var result = stdunit.find('1ft poop');
    expect(result).eql(['1ft']);
  });

  it('returns null if no matches', function() {
    var result = stdunit.find('poop');
    expect(result).eql(null);
  });

  it('converts all units if second argument', function() {
    var result = stdunit.find('1in 2ft 3mm', 'mm');
    expect(result).eql([25.4, 25.4*24, 3]);
  });
});
