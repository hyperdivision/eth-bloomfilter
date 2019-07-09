const { Keccak } = require('sha3')

function bloomBits (data) {
  const hash = new Keccak(256)
  hash.update(data)
  const b = hash.digest()

  return [
    toBit(b[0], b[1]),
    toBit(b[2], b[3]),
    toBit(b[4], b[5])
  ]
}

function toBit (high, low) {
  return ((high << 8) + low) & 2047
}

function set (pos, value) {
  const b = pos & 7
  const i = pos >> 3

  value[255 - i] |= (1 << b)
}

function has (pos, value) {
  const b = pos & 7
  const i = pos >> 3

  return !!(value[255 - i] & (1 << b))
}

module.exports = class EthBloom {
  constructor () {
    this.buffer = Buffer.alloc(256)
  }

  add (data) {
    for (const bits of bloomBits(data)) {
      set(bits, this.buffer)
    }
  }

  has (data) {
    for (const bits of bloomBits(data)) {
      if (!has(bits, this.buffer)) return false
    }
    return true
  }
}
