# stdunits
Parse and convert between standard units of measurement.

## API

### Normalize anything to a common unit
```
var stdunits = require('stdunits');
stdunits.to('mm', '55in'); // 1397
```

### Find all measurements in a string
```
stdunits.find('10m 55in', 'mm'); // [ 1000, 1397 ]
```

## Pixels and Percents
Some things require context. For instance, the px unit is only bound to real world measurement (such as pt) through a DPI (dots per inch). Your browser usually get this from the OS. To support px and % you have to provide the context:

```
stdunits.to('px', '32pt', {
  dpi: 60
});

// returns 10px
```

percentages need a scale:

```
stdunits.to('px', '10%', {
  scale: '100px' // if a plain number the target unit is used
});

// returns 10px
```

## License
MIT
