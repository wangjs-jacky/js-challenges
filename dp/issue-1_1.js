/* 
  题目： 动态规划
  fib(5) <- fib(4) + fib(3)
*/

/* 递归写法 */
/* 自定向下 */
const fib = (num) => {
  const cache = [];
  cache[0] = 0;
  cache[1] = 1;

  const dp = (n) => {
    /* n == 0 或者 n == 1, 截止直接返回值即可 */
    if (cache[n] !== undefined) {
      return cache[n];
    }
    cache[n] = dp(n - 1) + dp(n - 2);
    return cache[n]
  }

  console.log(cache);
  return dp(num);
}

console.log(fib(10)); // 0 + 1 + 1 + 2
