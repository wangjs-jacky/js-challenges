/**
 * 实现爬楼梯（Climbing Stairs）
 *
 * 要求：
 * - 递归转动态规划
 * - 记忆化搜索避免重复计算
 * - 空间优化：O(n) -> O(1)
 * - 理解斐波那契数列
 * - 时间复杂度：O(n)
 * - 空间复杂度：O(1) 优化后
 */

/**
 * 基础递归版本：爬楼梯
 * 每次可以爬 1 或 2 个台阶，求爬到 n 阶有多少种方法
 *
 * @param n 台阶数
 * @returns 爬法数量
 *
 * @example
 * climbStairs(3); // 3
 * // 解释：
 * // 1. 1 + 1 + 1
 * // 2. 1 + 2
 * // 3. 2 + 1
 *
 * @note 此版本在 n 较大时效率低，仅用于理解问题
 */
export function climbStairs(n: number): number {
  // TODO: 实现基础递归版本的爬楼梯
  throw new Error('Not implemented');
}

/**
 * 记忆化版本：爬楼梯
 * 使用数组或对象缓存已计算的结果，避免重复计算
 *
 * @param n 台阶数
 * @param memo 可选的记忆化缓存
 * @returns 爬法数量
 *
 * @example
 * climbStairsMemo(50); // 20365011074
 */
export function climbStairsMemo(n: number, memo?: number[]): number {
  // TODO: 实现记忆化版本的爬楼梯
  throw new Error('Not implemented');
}

/**
 * 动态规划版本：爬楼梯
 * 自底向上计算，使用数组存储中间结果
 *
 * @param n 台阶数
 * @returns 爬法数量
 */
export function climbStairsDP(n: number): number {
  // TODO: 实现动态规划版本的爬楼梯
  throw new Error('Not implemented');
}

/**
 * 空间优化版本：爬楼梯
 * 只需要保存前两个状态，空间复杂度 O(1)
 *
 * @param n 台阶数
 * @returns 爬法数量
 *
 * @example
 * climbStairsDPOptimized(100); // 573147844013817084101
 */
export function climbStairsDPOptimized(n: number): bigint {
  // TODO: 实现空间优化版本的爬楼梯
  throw new Error('Not implemented');
}

/**
 * 返回所有爬法（可选实现）
 * @param n 台阶数
 * @returns 所有爬法的二维数组
 *
 * @example
 * climbStairsPath(3);
 * // [
 * //   [1, 1, 1],
 * //   [1, 2],
 * //   [2, 1]
 * // ]
 */
export function climbStairsPath(n: number): number[][] {
  // TODO: 可选：返回所有爬法
  throw new Error('Not implemented');
}

/**
 * 矩阵快速幂版本（可选实现）
 * 使用矩阵快速幂算法，时间复杂度 O(log n)
 *
 * @param n 台阶数
 * @returns 爬法数量
 */
export function climbStairsMatrix(n: number): bigint {
  // TODO: 可选：使用矩阵快速幂实现
  throw new Error('Not implemented');
}

/**
 * 通项公式版本（可选实现）
 * 使用斐波那契数列的通项公式（Binet's Formula）
 *
 * @param n 台阶数
 * @returns 爬法数量
 */
export function climbStairsFormula(n: number): number {
  // TODO: 可选：使用通项公式实现
  throw new Error('Not implemented');
}

/**
 * 变种：每次可以爬 1, 2, 或 3 个台阶（可选实现）
 * @param n 台阶数
 * @returns 爬法数量
 */
export function climbStairsThreeSteps(n: number): number {
  // TODO: 可选：实现可以爬 1, 2, 或 3 个台阶的版本
  throw new Error('Not implemented');
}
