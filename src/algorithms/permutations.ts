/**
 * 实现数组全排列（Permutations）
 *
 * 要求：
 * - 回溯算法
 * - 剩余元素递归
 * - 路径收集
 * - 处理重复元素
 * - 时间复杂度：O(n! * n)
 * - 空间复杂度：O(n)
 */

/**
 * 生成数组的全排列
 * 使用回溯算法，每次选择一个元素，然后递归处理剩余元素
 *
 * @param nums 输入数组
 * @returns 所有全排列的二维数组
 *
 * @example
 * permute([1, 2, 3]);
 * // [
 * //   [1, 2, 3],
 * //   [1, 3, 2],
 * //   [2, 1, 3],
 * //   [2, 3, 1],
 * //   [3, 1, 2],
 * //   [3, 2, 1]
 * // ]
 */
export function permute(nums: number[]): number[][] {
  // TODO: 实现基础全排列
  throw new Error('Not implemented');
}

/**
 * 生成数组的不重复全排列
 * 处理数组中可能存在的重复元素
 *
 * @param nums 输入数组（可能包含重复元素）
 * @returns 所有不重复全排列的二维数组
 *
 * @example
 * permuteUnique([1, 1, 2]);
 * // [
 * //   [1, 1, 2],
 * //   [1, 2, 1],
 * //   [2, 1, 1]
 * // ]
 */
export function permuteUnique(nums: number[]): number[][] {
  // TODO: 实现去重全排列
  throw new Error('Not implemented');
}

/**
 * 迭代版本：生成数组的全排列
 * 使用迭代而非递归的方式实现
 *
 * @param nums 输入数组
 * @returns 所有全排列的二维数组
 */
export function permuteIterative(nums: number[]): number[][] {
  // TODO: 可选：实现迭代版本的全排列
  throw new Error('Not implemented');
}

/**
 * 生成第 k 个排列（可选实现）
 * 直接计算第 k 个排列，不生成所有排列
 *
 * @param n 数字 1 到 n
 * @param k 第 k 个排列
 * @returns 第 k 个排列
 */
export function getPermutation(n: number, k: number): string {
  // TODO: 可选：实现获取第 k 个排列（LeetCode 60）
  throw new Error('Not implemented');
}

/**
 * 下一个排列（可选实现）
 * 找出给定排列的下一个排列（字典序）
 *
 * @param nums 当前排列
 * @returns 是否有下一个排列
 */
export function nextPermutation(nums: number[]): boolean {
  // TODO: 可选：实现下一个排列（LeetCode 31）
  throw new Error('Not implemented');
}

/**
 * 上一个排列（可选实现）
 * 找出给定排列的上一个排列（字典序）
 *
 * @param nums 当前排列
 * @returns 是否有上一个排列
 */
export function prevPermutation(nums: number[]): boolean {
  // TODO: 可选：实现上一个排列
  throw new Error('Not implemented');
}
