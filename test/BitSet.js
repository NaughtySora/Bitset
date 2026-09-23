"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { BitSet } = require("../main");

describe("Bitset", () => {
  it("get/set/unset - simple", () => {
    const bitset = new BitSet(64);
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

  it("allocation fail, limit exceeded",
    { expectFailure: { message: 'ArrayBuffer.prototype.resize: Invalid length parameter' } }
    , () => {
      const bitset = new BitSet(8); // limit is 64
      bitset.set(0xFF);
    });
});