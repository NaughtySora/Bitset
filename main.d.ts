export class BitSet {
  constructor(maxByteLength: number, allocate?: number);
  get(value: number): Boolean;
  set(value: number): void;
  unset(value: number): Boolean;
}