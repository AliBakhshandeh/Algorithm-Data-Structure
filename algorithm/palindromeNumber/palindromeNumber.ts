// time complexity O(n)
const isPalindrome = (x: number) => {
  if (x < 0) {
    return false;
  }
  const num: string = x.toString();
  let left: number = 0;
  let right: number = num.length - 1;
  while (left <= right) {
    if (num[left] !== num[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};
const result = isPalindrome(121);
console.log(result);
