"use strict";

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { BitSetN } = require("../main");

describe("BitsetN", () => {
  it("get/set/unset - simple", () => {
    const bitset = new BitSetN();
    assert.ok(!bitset.get(1));
    assert.ok(!bitset.get(24));
    assert.ok(!bitset.get(0xFFF1));
    bitset.set(24);
    bitset.set(0xFFF1);
    bitset.set(21);
    assert.ok(!bitset.get(1));
    assert.ok(bitset.get(24));
    assert.ok(bitset.get(0xFFF1));
    assert.ok(bitset.get(21));
    bitset.unset(21);
    bitset.unset(24);
    assert.ok(!bitset.get(1));
    assert.ok(!bitset.get(24));
    assert.ok(bitset.get(0xFFF1));
    assert.ok(!bitset.get(21));
  });
});
