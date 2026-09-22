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

  get(value) {
    const index = value >> SHIFT;
    if (index > this.#buffer.byteLength) return 0;
    const position = value & MOD;
    return !!(this.#set[index] & (1 << position));
  }

  set(value) {
    const index = value >> SHIFT;
    const position = value & MOD;
    if (index >= this.#buffer.byteLength) {
      this.#buffer.resize(index + 1);
    }
    this.#set[index] |= (1 << position);
  }

  unset(value) {
    const index = value >> SHIFT;
    if (index >= this.#buffer.byteLength) return false;
    const position = value & MOD;
    const mask = ~(1 << position);
    this.#set[index] &= mask;
    return true;
  }
}

module.exports = { BitSet };