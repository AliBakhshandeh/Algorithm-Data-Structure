/*
    Tree Approaches to Solving the Algorithm
    1. Nested Loops
    2. Objects
    3. Hash map
*/

// 1. Nested Loops
// time complexity O(n ^ 2)
// space complexity O(n ^ 2)
const twoSumNestedLoops = (nums: number[], target: number): number[] | [] => {
  if (nums.length < 1) {
    throw new Error("Array must have at least one element or up");
  }

  for (let i: number = 0; i <= nums.length; i++) {
    for (let j: number = i + 1; j <= nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
};

const resultTwoSumNestedLoops = twoSumNestedLoops([3, 2, 4], 6);
console.log(resultTwoSumNestedLoops);

// 2. Objects
// time complexity O(n)
// space complexity O(n)
const twoSumObjects = (nums: number[], target: number): number[] | [] => {
  if (nums.length <= 1) {
    throw new Error("Array must have at least one element or up");
  }
  const obj: { [key: number]: number } = {};
  for (let i: number = 0; i <= nums.length; i++) {
    const res = target - nums[i];
    if (obj[res] != undefined) {
      return [obj[res], i];
    } else {
      obj[nums[i]] = i;
    }
  }
  return [];
};

const resultTwoSumObjects = twoSumObjects([3, 2, 4], 6);
console.log(resultTwoSumObjects);

// 3. Hash map
// time complexity O(n)
// space complexity O(n)
const twoSumHashMap = (nums: number[], target: number): number[] | [] => {
  if (nums.length <= 1) {
    throw new Error("Array must have at least one element or up");
  }
  const map: Map<number, number> = new Map();
  for (let i: number = 0; i <= nums.length; i++) {
    const res = target - nums[i];
    if (map.has(res)) {
      return [map.get(res) as number, i];
    } else {
      map.set(nums[i], i);
    }
  }
  return [];
};

const resultTwoSumHashMap = twoSumHashMap([3, 2, 4], 6);
console.log(resultTwoSumHashMap);
