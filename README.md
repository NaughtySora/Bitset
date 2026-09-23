# Bitset
Fixed-size sequence of bits used to store and manipulate boolean values efficiently.\

Instead of using a full byte or integer for every single true/false value, 
a bitset packs multiple boolean flags into a single memory address.

#### Implementations
- Bitset using JS typed array
- BitSetN using bigint as storage
- SparseBitSet using map to store sparse indexes
