// time complexity O(n)
// space complexity O(n)
const fib = (n: number): number => {
    const arr: number[] = [0, 1];
    for (let i: number = 2; i <= n; i++) {
        arr.push(arr[i - 1] + arr[i - 2])
    }
    return arr[n]
}
const resultFib = fib(4)
console.log(resultFib)