"use strict";

const BYTE_SIZE = 32;
const SHIFT = Math.log2(BYTE_SIZE);

class SparseBitSet {
  #store = new Map();

  get(bit) {
    const index = bit >> SHIFT;
    const value = this.#store.get(index);
    if (value === undefined) return false;
    return !!(value & (1 << bit));
  }

  set(bit) {
    const index = bit >> SHIFT;
    var value = this.#store.get(index) ??
      (this.#store.set(index, value = 0), value);
    this.#store.set(index, value | (1 << bit));

  }

  unset(bit) {
    const index = bit >> SHIFT;
    const value = this.#store.get(index);
    if (value === undefined) return false;
    this.#store.set(index, value & ~(1 << bit));
    return true;
  }
}

module.exports = { SparseBitSet };