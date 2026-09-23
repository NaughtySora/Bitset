declare class Iface {
  get(value: number): Boolean;
  set(value: number): void;
  unset(value: number): Boolean;
}

export declare class BitSet extends Iface {
  constructor(maxByteLength: number, allocate?: number);
}

export declare class SparseBitSet extends Iface {
  get(value: number): Boolean;
}

export declare class BitSetN extends Iface {
  constructor(value?: number);
}