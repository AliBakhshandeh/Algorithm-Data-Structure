const replaceQuestionMarks = (str) => {
  if (str === "") return [];
  let questionsCount = 0;
  for (let char of str) {
    if (char === "?") {
      questionsCount++;
    }
  }
  const questionsAlternativesCount = Math.pow(2, questionsCount);
  const result = [];
  for (let i = 0; i < questionsAlternativesCount; i++) {
    const binary = i.toString(2).padStart(questionsCount, 0);
    let newStr = "";
    let binaryIndex = 0;
    for (let char of str) {
      if (char === "?") {
        newStr += binary[binaryIndex];
        binaryIndex++;
      } else {
        newStr += char;
      }
    }
    result.push(newStr);
  }
  console.log(result);
};
const sample = "10?11?01?";
replaceQuestionMarks(sample);

class TimeBasedStore {
  constructor() {
    this.store = new Map();
  }

  // ذخیره‌سازی داده
  set(key, value, timestamp) {
    if (!this.store.has(key)) {
      this.store.set(key, []);
    }
    const entries = this.store.get(key);
    entries.push({ value, timestamp });
    entries.sort((a, b) => a.timestamp - b.timestamp); // مرتب‌سازی داده‌ها بر اساس timestamp
  }

  // دریافت داده بر اساس نزدیک‌ترین timestamp
  get(key, timestamp) {
    if (!this.store.has(key)) {
      return null;
    }

    const entries = this.store.get(key);
    let closestValue = null;
    let left = 0;
    let right = entries.length - 1;

    // جستجوی دودویی برای پیدا کردن نزدیک‌ترین timestamp
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const midTimestamp = entries[mid].timestamp;

      if (midTimestamp === timestamp) {
        return entries[mid].value;
      }

      if (midTimestamp < timestamp) {
        closestValue = entries[mid].value; // ذخیره نزدیک‌ترین مقدار از سمت چپ
        left = mid + 1; // جستجو به سمت راست
      } else {
        right = mid - 1; // جستجو به سمت چپ
      }
    }

    // بررسی اینکه آیا ایندکس‌های valid هستند
    if (left < entries.length && right >= 0) {
      const leftDifference = Math.abs(entries[left].timestamp - timestamp);
      const rightDifference = Math.abs(entries[right].timestamp - timestamp);

      // انتخاب نزدیک‌ترین مقدار
      if (leftDifference < rightDifference) {
        closestValue = entries[left].value;
      } else {
        closestValue = entries[right].value;
      }
    } else if (left < entries.length) {
      closestValue = entries[left].value; // اگر `left` معتبر باشد
    } else if (right >= 0) {
      closestValue = entries[right].value; // اگر `right` معتبر باشد
    }

    return closestValue;
  }
}

// مثال استفاده
const store = new TimeBasedStore();
store.set("key1", "test1", 1);
store.set("key1", "test2", 2);
store.set("key1", "test3", 5);

console.log(store.get("key1", 2)); // "test2"
console.log(store.get("key1", 4)); // "test3"
console.log(store.get("key1", 0)); // "test1"
