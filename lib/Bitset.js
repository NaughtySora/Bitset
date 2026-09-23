"use strict";

const BYTE_SIZE = 8;
const SHIFT = Math.log2(BYTE_SIZE);
const MOD = BYTE_SIZE - 1;

class BitSet {
  #set = null;
  #buffer = null;

  constructor(maxByteLength, allocate = 1) {
    this.#set = new Uint8Array(
      this.#buffer = new ArrayBuffer(allocate, { maxByteLength })
    );
  }

  get(bit) {
    const index = bit >> SHIFT;
    if (index > this.#buffer.byteLength) return false;
    const position = bit & MOD;
    return !!(this.#set[index] & (1 << position));
  }

  set(bit) {
    const index = bit >> SHIFT;
    const position = bit & MOD;
    if (index >= this.#buffer.byteLength) {
      this.#buffer.resize(index + 1);
    }
    this.#set[index] |= (1 << position);
  }

  unset(bit) {
    const index = bit >> SHIFT;
    if (index >= this.#buffer.byteLength) return false;
    const position = bit & MOD;
    const mask = ~(1 << position);
    this.#set[index] &= mask;
    return true;
  }
}

module.exports = { BitSet };