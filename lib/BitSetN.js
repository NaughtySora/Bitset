"use strict";

const BASE = 1n;

class BitSetN {
  #value;

  constructor(value = 0n) {
    this.#value = value;
  }

  get(bit) {
    return !!(this.#value & (BASE << BigInt(bit)));
  }

  set(bit) {
    this.#value |= (BASE << BigInt(bit));
  }

  unset(bit) {
    this.#value &= ~(BASE << BigInt(bit));
  }

  get value() {
    return this.#value;
  }

  toString() {
    return this.#value.toString();
  }
}

module.exports = { BitSetN };
