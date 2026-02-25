/**
 * 斐波那契数列（动态规划）
 *
 * 题目：fib(n) = fib(n-1) + fib(n-2)，其中 fib(0)=0, fib(1)=1
 *
 * 要求：
 * - 自顶向下：递归 + 缓存（记忆化搜索），避免重复计算
 * - 自底向上：迭代 + 数组递推，从 fib(0)、fib(1) 推到 fib(n)
 * - 理解动态规划的两种实现方式
 */

/**
 * 自顶向下：递归 + 缓存
 * 思路：从 n 往下递归，用 cache 存已算过的 fib(k)，避免重复子问题
 *
 * @param n 第 n 项（n >= 0），fib(0)=0, fib(1)=1
 * @returns 第 n 项斐波那契数
 *
 * @example
 * fibTopDown(0); // 0
 * fibTopDown(1); // 1
 * fibTopDown(10); // 55
 */
export function fibTopDown(n: number): number {
  // TODO: 实现自顶向下（递归 + 缓存）
  throw new Error('Not implemented');
}

/**
 * 自底向上：迭代 + 数组递推
 * 思路：从 fib(0)、fib(1) 开始，用循环填表到 fib(n)
 *
 * @param n 第 n 项（n >= 0）
 * @returns 第 n 项斐波那契数
 *
 * @example
 * fibBottomUp(0); // 0
 * fibBottomUp(1); // 1
 * fibBottomUp(10); // 55
 */
export function fibBottomUp(n: number): number {
  // TODO: 实现自底向上（迭代 + memo 数组）
  throw new Error('Not implemented');
}
