"use strict";

const INT32_BITS = 32;
const SHIFT = Math.log2(INT32_BITS);
const INT32_SHIFTS = INT32_BITS - 1;
const INT32_BIT_MASK = 0xFFFFFFFF;

const trailingZeros = i => {
  if (i === 0) return INT32_BITS;
  let base = INT32_BITS;
  let n = INT32_SHIFTS;
  let y;
  while (base !== 1) {
    y = i << (base >>= 1);
    if (y !== 0) (n -= base, i = y);
  }
  return n - ((i << 1) >>> INT32_SHIFTS);
};

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
  // Can optimize more, this just an example, the sort is not good.
  // Can maintain sorted keys separately, but if you use just get/set its a waste.
  // Also for key can be searched with binary search.
  nextSet(bit) {
    let index = bit >> SHIFT;
    let value = this.#store.get(index);
    if (value !== undefined) {
      value &= (INT32_BIT_MASK << (bit & INT32_SHIFTS));
      if (value !== 0) return (index << SHIFT) + trailingZeros(value);
    }
    const keys = [...this.#store.keys()].sort((a, b) => a - b);
    let i = 0;
    while (i < keys.length) {
      const key = keys[i];
      if (key > index) break;
      i++;
    }
    while (i < keys.length) {
      value = this.#store.get(keys[i]);
      if (value !== 0) return (keys[i] << SHIFT) + trailingZeros(value);
    }
    return -1;
  }
}

module.exports = { SparseBitSet };
