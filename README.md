# eth-bloomfilter

Javascript implementation of the Ethereum bloom filter

```
npm install eth-bloomfilter
```

## Usage

``` js
const EBF = require('eth-bloomfilter')

const filter = new EBF()

filter.add(Buffer.from('hi'))
filter.has(Buffer.from('hi'))
```

## API

#### `filter = new EBF()`

Make a new bloom filter.

#### `filter.buffer`

The underlying 256 byte buffer containing the filter

#### `filter.add(buf)`

Add a buffer to the filter

#### `bool = filter.has(buf)`

Check if a buffer is in the filter

## License

MIT
