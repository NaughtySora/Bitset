"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { SparseBitSet } = require("../main");

describe("SparseBitSet", () => {
  it("get/set/unset - simple", () => {
    const bitset = new SparseBitSet(64);
    assert.ok(!bitset.get(3));
    assert.ok(!bitset.get(7));
    assert.ok(!bitset.get(8));
    assert.ok(!bitset.get(2));
    bitset.set(3);
    bitset.set(7);
    bitset.set(8);
    assert.ok(bitset.get(3));
    assert.ok(bitset.get(7));
    assert.ok(bitset.get(8));
    assert.ok(!bitset.get(2));
    bitset.unset(7);
    bitset.unset(8);
    assert.ok(bitset.get(3));
    assert.ok(!bitset.get(7));
    assert.ok(!bitset.get(8));
    bitset.unset(3);
    assert.ok(!bitset.get(3));
  });

  it("big number", () => {
    const bits = new SparseBitSet();
    assert.ok(!bits.get(0xFFFF));
    assert.ok(!bits.get(23));
    assert.ok(!bits.get(6));
    bits.set(0xFFFF);
    bits.set(23);
    bits.set(2);
    assert.ok(bits.get(0xFFFF));
    assert.ok(bits.get(23));
    assert.ok(bits.get(2));
    assert.ok(!bits.get(6));
    bits.unset(0xFFFF);
    bits.unset(23);
    assert.ok(!bits.get(0xFFFF));
    assert.ok(!bits.get(23));
    assert.ok(bits.get(2));
    assert.ok(!bits.get(6));
  });

});