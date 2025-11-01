class TimeBasedStore {
  constructor() {
    this.store = new Map();
  }

  // ذخیره‌سازی داده
  set(key, value, timestamp) {
    if (!this.store.has(key)) {
      this.store.set(key, []);
    }

    if (this.store.get(key).length === 0) {
      this.store.set(key, [{ value, timestamp }]);
      return;
    }

    const entries = this.store.get(key);
    // پیدا کردن محل مناسب برای وارد کردن داده جدید به صورت مرتب
    let left = 0,
      right = entries.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (entries[mid].timestamp === timestamp) {
        // اگر timestamp برابر بود
        entries.splice(mid, 0, { value, timestamp });
        return;
      } else if (entries[mid].timestamp < timestamp) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    // اگر مقدار برابر پیدا نشد، داده جدید را در موقعیت مناسب قرار می‌دهیم
    entries.splice(left, 0, { value, timestamp });
  }

  // دریافت داده بر اساس key و timestamp نزدیک با استفاده از باینری سرچ
  get(key, timestamp) {
    if (!this.store.has(key)) {
      return "value not found";
    }

    const entries = this.store.get(key);

    // جستجوی باینری برای پیدا کردن نزدیک‌ترین مقدار
    let left = 0;
    let right = entries.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const entry = entries[mid];

      if (entry.timestamp === timestamp) {
        return entry.value; // اگر timestamp دقیقا برابر بود
      } else if (entry.timestamp < timestamp) {
        left = mid + 1; // جستجو در سمت راست
      } else {
        right = mid - 1; // جستجو در سمت چپ
      }
    }

    // در صورتی که دقیقاً مقدار برابر پیدا نشد، باید نزدیک‌ترین مقدار را پیدا کنیم
    if (right < 0) {
      // اگر timestamp از همه مقادیر بزرگتر باشد
      return entries[0].value; // نزدیکترین مقدار از ابتدای آرایه
    }

    if (left >= entries.length) {
      // اگر timestamp از همه مقادیر کوچک‌تر باشد
      return entries[entries.length - 1].value; // نزدیکترین مقدار از انتهای آرایه
    }

    const prevEntry = entries[right];
    const nextEntry = entries[left];
    const prevDiff = timestamp - prevEntry.timestamp;
    const nextDiff = nextEntry.timestamp - timestamp;

    // اگر timestamp به prevEntry نزدیکتر است
    if (prevDiff <= nextDiff) {
      return prevEntry.value;
    } else {
      return nextEntry.value;
    }
  }
}

const store = new TimeBasedStore();
store.set("key1", "test1", 1);
store.set("key1", "test2", 2);
store.set("key1", "test3", 5);

console.log(store.get("key1", 2)); // "test2"
console.log(store.get("key1", 4)); // "value not found"
console.log(store.get("key1", 1)); // "test1"
console.log(store.get("key1", 5)); // "test3"
