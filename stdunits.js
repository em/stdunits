var stdunit = module.exports = {
  db: {}
, define: function(map) {
    for(var k in map) {
      if(!map.hasOwnProperty(k)) continue;

      k.split(',').forEach(function(subk) {
        this.db[subk.trim()] = map[k];
      }, this);
    }

    // Rebuild the regex
    var units = Object.keys(this.db).join('|');
    this.regex = new RegExp('([+-\d\.]*('+units+'))','g');
  }
, find: function(src, toUnit) {
    var match = src.match(this.regex);

    // Return any null results
    if(!match) return match;

    // Convert to a normal unit if provided
    if(toUnit) {
      match = match.map(function(match) {
        return stdunit.to(toUnit, match);
      });
    }

    return match;
  }
, replace: function(toUnit, str, ctx) {
    return str.replace(regex, function() {
    });
  }
, to: function(destUnit, src, ctx) {
    if(typeof src === 'number') {
      return src;
    }

    ctx = ctx || {};

    //                       number    unit
    var match = src.match(/([+\-\d\.]*)(.*)/);

    var srcVal = match[1] === '' ? 1 : Number(match[1]);

    var srcUnit = match[2] || destUnit;

    var srcToBase = this.procDef(srcUnit, ctx);
    var baseToDest = 1/this.procDef(destUnit, ctx);

    return srcVal * srcToBase * baseToDest;
  }
, procDef: function(unit, ctx) {
    var def = this.db[unit];

    if(typeof def === 'function') {
      return def(ctx);
    }

    return def;
  }
};

/**
 * Length
 */
stdunit.define({
  'mm': 1
, 'cm': 10
, 'm': 10*10
, 'km': 10*10*10
, 'in,"': 25.4
, "ft,'": 25.4*12
, 'pt': 1/72*25.4
, 'px': function(ctx) {
    return 25.4 / (ctx.ppi || 96);
  }
, '%': function(ctx) {
    return stdunit.to('mm', ctx.scale)/100;
  }
});


/**
 * Speed
 */
stdunit.define({
  'mm/s': 1
, 'cm/s': 10
, 'm/s': 10*10
, 'km/s': 10*10*10
, 'km/h': 10*10*10/60
, 'mi/h, mph': 447.04
, 'in/s': 25.4
, 'in/m, ipm': 25.4/60
});


