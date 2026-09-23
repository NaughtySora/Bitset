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
    const bitset = new SparseBitSet();
    assert.ok(!bitset.get(0xFFFF));
    assert.ok(!bitset.get(23));
    assert.ok(!bitset.get(6));
    bitset.set(0xFFFF);
    bitset.set(23);
    bitset.set(2);
    assert.ok(bitset.get(0xFFFF));
    assert.ok(bitset.get(23));
    assert.ok(bitset.get(2));
    assert.ok(!bitset.get(6));
    bitset.unset(0xFFFF);
    bitset.unset(23);
    assert.ok(!bitset.get(0xFFFF));
    assert.ok(!bitset.get(23));
    assert.ok(bitset.get(2));
    assert.ok(!bitset.get(6));
  });

  it("search set bit", () => {
    const bitset = new SparseBitSet();
    bitset.set(0xFFFF);
    bitset.set(0xFFF1);
    bitset.set(0xFFFFF);
    bitset.set(1);
    bitset.set(6);
    bitset.set(22);
    assert.equal(bitset.nextSet(1), 1);
    assert.equal(bitset.nextSet(2), 6);
    assert.equal(bitset.nextSet(3), 6);
    assert.equal(bitset.nextSet(4), 6);
    assert.equal(bitset.nextSet(5), 6);
    assert.equal(bitset.nextSet(6), 6);
    assert.equal(bitset.nextSet(7), 22);
    assert.equal(bitset.nextSet(12), 22);
    assert.equal(bitset.nextSet(21), 22);
    assert.equal(bitset.nextSet(22), 22);
    assert.equal(bitset.nextSet(24), 0xFFF1);
    assert.equal(bitset.nextSet(32), 0xFFF1);
    assert.equal(bitset.nextSet(32), 0xFFF1);
    assert.equal(bitset.nextSet(0xFFF0), 0xFFF1);
    assert.equal(bitset.nextSet(0xFFF1), 0xFFF1);
    assert.equal(bitset.nextSet(0xFFFE), 0xFFFF);
    assert.equal(bitset.nextSet(0xFFFF), 0xFFFF);
    assert.equal(bitset.nextSet(0xFFFFE), 0xFFFFF);
    assert.equal(bitset.nextSet(0xFFFFF), 0xFFFFF);
    assert.equal(bitset.nextSet(0xFFFFF0), -1);
    assert.equal(bitset.nextSet(0xFFFFF1), -1);
  });
});