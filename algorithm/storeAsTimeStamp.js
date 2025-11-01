class StoreAsTimestamp {
  constructor() {
    this.store = new Map();
  }

  set(key, value, timestamp) {
    if (!this.store.has(key)) {
      this.store.set(key, []);
    }
    const entries = this.store.get(key);
    let left = 0;
    let right = entries.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (entries[mid].timestamp === timestamp) {
        entries.splice(mid, 0, { value, timestamp });
        return;
      } else if (entries[mid].timestamp < timestamp) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    entries.splice(left, 0, { value, timestamp });
  }

  get(key, timestamp) {
    if (!this.store.has(key)) {
      return "key not found";
    }
    const entries = this.store.get(key);
    let left = 0;
    let right = entries.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (entries[mid].timestamp === timestamp) {
        return entries[mid].value;
      } else if (entries[mid].timestamp < timestamp) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    if (right < 0) {
      return entries[0].value;
    }

    if (left >= entries.length - 1) {
      return entries[entries.length - 1].value;
    }

    const prevEntry = entries[right];
    const nextEntry = entries[left];
    const prevDiff = timestamp - prevEntry.timestamp;
    const nextDiff = nextEntry.timestamp - timestamp;

    if (prevDiff <= nextDiff) {
      return prevEntry.value;
    } else {
      nextEntry.value;
    }
  }
}

const store = new StoreAsTimestamp();
store.set("key1", "test1", 1);
store.set("key1", "test2", 2);
store.set("key1", "test3", 5);

console.log(store.get("key1", 2)); // "test2"
console.log(store.get("key2", 4)); // "value not found"
console.log(store.get("key1", 1)); // "test1"
console.log(store.get("key1", 5)); // "test3"
